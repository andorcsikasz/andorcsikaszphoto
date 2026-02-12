class MandelbrotRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particleCanvas = document.getElementById('particleCanvas');
        this.particleCtx = this.particleCanvas.getContext('2d');
        this.vasarelyCanvas = document.getElementById('vasarelyCanvas');
        this.vasarelyCtx = this.vasarelyCanvas.getContext('2d');
        this.scanlineCanvas = document.getElementById('scanlineCanvas');
        this.scanlineCtx = this.scanlineCanvas.getContext('2d');
        this.imageData = null;
        
        // Moon position
        this.moonElement = document.getElementById('moon');
        this.moonX = 0;
        this.moonY = 0;
        this.updateMoonPosition();
        
        // View parameters
        this.centerX = -0.5;
        this.centerY = 0;
        this.zoom = 1;
        this.maxIterations = 100;
        
        // Animation parameters
        this.autoZoomSpeed = 0.006;
        this.zoomDirection = 1;
        this.time = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.fps = 0;
        this.isRendering = false;
        this.renderRequested = false;
        
        // Canvas dimensions
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        // Animation path (spiral zoom)
        this.pathPhase = 0;
        this.pathRadius = 0.5;
        
        // Lower resolution for background (better performance)
        this.renderScale = 0.5;
        
        // Particle system for circling Mandelbrot patterns
        this.particles = [];
        this.particleAngle = 0;
        this.particleRadius = 0;
        this.patternCache = new Map();
        this.cacheFrame = 0;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.setupScanlines();
        this.setupVasarelyPatterns();
        this.setupParticles();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.updateMoonPosition();
        });
    }
    
    updateMoonPosition() {
        if (this.moonElement) {
            const rect = this.moonElement.getBoundingClientRect();
            this.moonX = rect.left + rect.width / 2;
            this.moonY = rect.top + rect.height / 2;
        }
    }
    
    setupParticles() {
        // Create particles that will form Mandelbrot patterns
        this.particles = [];
        const particleCount = 6; // Number of orbiting Mandelbrot patterns
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                angle: (i / particleCount) * Math.PI * 2,
                radius: 120 + Math.random() * 80,
                speed: 0.008 + Math.random() * 0.015,
                size: 50 + Math.random() * 40,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    resizeCanvas() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // Use lower resolution for background (better performance)
        const renderWidth = Math.floor(this.width * this.renderScale);
        const renderHeight = Math.floor(this.height * this.renderScale);
        this.canvas.width = renderWidth;
        this.canvas.height = renderHeight;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.particleCanvas.width = this.width;
        this.particleCanvas.height = this.height;
        this.vasarelyCanvas.width = this.width;
        this.vasarelyCanvas.height = this.height;
        this.scanlineCanvas.width = this.width;
        this.scanlineCanvas.height = this.height;
        this.imageData = this.ctx.createImageData(renderWidth, renderHeight);
        this.setupScanlines();
        this.setupVasarelyPatterns();
        this.updateMoonPosition();
    }
    
    setupScanlines() {
        // Create CRT scanline effect
        const gradient = this.scanlineCtx.createLinearGradient(0, 0, 0, 2);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.08)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.scanlineCtx.fillStyle = gradient;
        for (let y = 0; y < this.height; y += 2) {
            this.scanlineCtx.fillRect(0, y, this.width, 2);
        }
    }
    
    setupVasarelyPatterns() {
        // Vasarely-style Op Art patterns
        this.vasarelyTime = 0;
        this.vasarelyGridSize = 40;
    }
    
    renderVasarelyPatterns() {
        this.vasarelyTime += 0.01;
        const ctx = this.vasarelyCtx;
        
        // Clear with fade
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, this.width, this.height);
        
        const gridSize = this.vasarelyGridSize;
        const cols = Math.ceil(this.width / gridSize);
        const rows = Math.ceil(this.height / gridSize);
        
        // Draw geometric grid pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSize;
                const y = row * gridSize;
                
                // Create optical illusion with varying sizes
                const phase = (row + col) * 0.5 + this.vasarelyTime;
                const size = gridSize * (0.3 + Math.sin(phase) * 0.2);
                const centerX = x + gridSize / 2;
                const centerY = y + gridSize / 2;
                
                // Draw concentric circles (Vasarely's signature style)
                ctx.beginPath();
                ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
                ctx.stroke();
                
                // Draw inner geometric shapes
                const innerSize = size * 0.6;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY - innerSize / 2);
                ctx.lineTo(centerX + innerSize / 2, centerY);
                ctx.lineTo(centerX, centerY + innerSize / 2);
                ctx.lineTo(centerX - innerSize / 2, centerY);
                ctx.closePath();
                ctx.stroke();
            }
        }
        
        // Draw diagonal stripes (Zebra pattern - Vasarely style)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        const stripeSpacing = 30;
        const offset = (this.vasarelyTime * 10) % stripeSpacing;
        
        for (let i = -this.height; i < this.width + this.height; i += stripeSpacing) {
            ctx.beginPath();
            ctx.moveTo(i + offset, 0);
            ctx.lineTo(i + offset - this.height, this.height);
            ctx.stroke();
        }
        
        // Draw checkerboard pattern overlay
        const checkerSize = 20;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        for (let y = 0; y < this.height; y += checkerSize * 2) {
            for (let x = 0; x < this.width; x += checkerSize * 2) {
                const phase = Math.floor((x + y) / (checkerSize * 2)) % 2;
                if (phase === 0) {
                    ctx.fillRect(x, y, checkerSize, checkerSize);
                    ctx.fillRect(x + checkerSize, y + checkerSize, checkerSize, checkerSize);
                }
            }
        }
        
        // Draw spiral patterns (Vasarely's Vega series style)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const maxRadius = Math.max(this.width, this.height) * 0.6;
        
        for (let r = 10; r < maxRadius; r += 15) {
            ctx.beginPath();
            for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
                const radius = r + Math.sin(angle * 2 + this.vasarelyTime) * 5;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                if (angle === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
    }
    
    // Convert pixel coordinates to complex plane coordinates
    pixelToComplex(x, y) {
        const scale = 4 / this.zoom;
        const real = this.centerX + (x / (this.canvas.width) - 0.5) * scale;
        const imag = this.centerY + (y / (this.canvas.height) - 0.5) * scale;
        return { real, imag };
    }
    
    // Calculate Mandelbrot iterations for a point
    mandelbrotIterations(cReal, cImag) {
        let zReal = 0;
        let zImag = 0;
        let iterations = 0;
        
        while (iterations < this.maxIterations) {
            const zRealSquared = zReal * zReal;
            const zImagSquared = zImag * zImag;
            
            if (zRealSquared + zImagSquared > 4) {
                break;
            }
            
            const temp = zRealSquared - zImagSquared + cReal;
            zImag = 2 * zReal * zImag + cImag;
            zReal = temp;
            
            iterations++;
        }
        
        return iterations;
    }
    
    // Black and white coloring with smooth gradients
    getBWColor(iterations, cReal, cImag) {
        if (iterations === this.maxIterations) {
            return 0; // Black for points in the set
        }
        
        // Calculate smooth iteration count
        let zReal = 0;
        let zImag = 0;
        for (let i = 0; i < iterations; i++) {
            const temp = zReal * zReal - zImag * zImag + cReal;
            zImag = 2 * zReal * zImag + cImag;
            zReal = temp;
        }
        
        const modulus = Math.sqrt(zReal * zReal + zImag * zImag);
        const smoothIter = iterations + 1 - Math.log(Math.log(modulus)) / Math.log(2);
        
        // Map to grayscale (0-255)
        // Use exponential mapping for better contrast
        const normalized = (smoothIter / this.maxIterations) % 1;
        const brightness = Math.pow(normalized, 0.5) * 255;
        
        return Math.floor(Math.max(0, Math.min(255, brightness)));
    }
    
    // Render the Mandelbrot set
    render() {
        if (this.isRendering) {
            this.renderRequested = true;
            return;
        }
        
        this.isRendering = true;
        const startTime = performance.now();
        
        const renderWidth = this.canvas.width;
        const renderHeight = this.canvas.height;
        
        // Render in chunks for smoother animation
        const chunkSize = Math.max(1, Math.floor(renderWidth / 4));
        let currentChunk = 0;
        const totalChunks = Math.ceil(renderWidth / chunkSize);
        
        const renderChunk = () => {
            const startX = currentChunk * chunkSize;
            const endX = Math.min(startX + chunkSize, renderWidth);
            
            for (let y = 0; y < renderHeight; y++) {
                for (let x = startX; x < endX; x++) {
                    const complex = this.pixelToComplex(x, y);
                    const iterations = this.mandelbrotIterations(complex.real, complex.imag);
                    const brightness = this.getBWColor(iterations, complex.real, complex.imag);
                    
                    const index = (y * renderWidth + x) * 4;
                    this.imageData.data[index] = brightness;     // Red
                    this.imageData.data[index + 1] = brightness; // Green
                    this.imageData.data[index + 2] = brightness; // Blue
                    this.imageData.data[index + 3] = 255;        // Alpha
                }
            }
            
            // Update canvas progressively
            this.ctx.putImageData(this.imageData, 0, 0);
            
            currentChunk++;
            if (currentChunk < totalChunks) {
                requestAnimationFrame(renderChunk);
            } else {
                const endTime = performance.now();
                this.updateFPS(endTime - startTime);
                this.isRendering = false;
                
                if (this.renderRequested) {
                    this.renderRequested = false;
                    this.render();
                }
            }
        };
        
        renderChunk();
    }
    
    // Animate the view (auto-zoom and spiral)
    updateAnimation() {
        this.time += 0.016; // ~60fps
        
        // Spiral zoom path
        this.pathPhase += 0.004;
        const spiralRadius = 0.5 + Math.sin(this.pathPhase * 2) * 0.2;
        const angle = this.pathPhase * 3;
        
        // Continuous zoom
        this.zoom *= (1 + this.autoZoomSpeed * this.zoomDirection);
        
        // Auto-reverse zoom direction at limits
        if (this.zoom > 500000) {
            this.zoomDirection = -1;
        } else if (this.zoom < 1) {
            this.zoomDirection = 1;
            this.zoom = 1;
            // Reset to interesting location
            this.centerX = -0.5 + Math.cos(angle) * spiralRadius;
            this.centerY = Math.sin(angle) * spiralRadius;
        }
        
        // Spiral movement
        this.centerX = -0.5 + Math.cos(angle) * spiralRadius / Math.sqrt(this.zoom);
        this.centerY = Math.sin(angle) * spiralRadius / Math.sqrt(this.zoom);
        
        // Adjust iterations based on zoom
        this.maxIterations = Math.min(400, Math.floor(80 + Math.log2(this.zoom) * 12));
        
        this.updateInfo();
    }
    
    updateFPS(renderTime) {
        this.frameCount++;
        const now = performance.now();
        const elapsed = now - this.lastFrameTime;
        
        if (elapsed >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / elapsed);
            this.frameCount = 0;
            this.lastFrameTime = now;
            const fpsElement = document.getElementById('fps');
            if (fpsElement) {
                fpsElement.textContent = this.fps;
            }
        }
    }
    
    updateInfo() {
        const zoomElement = document.getElementById('zoomLevel');
        const iterElement = document.getElementById('iterations');
        
        if (zoomElement) {
            zoomElement.textContent = this.zoom.toFixed(2) + 'x';
        }
        if (iterElement) {
            iterElement.textContent = this.maxIterations;
        }
    }
    
    // Render Mandelbrot pattern at a specific position (optimized)
    renderMandelbrotPattern(x, y, size, time) {
        const patternSize = Math.floor(size);
        const cacheKey = `${Math.floor(patternSize / 10)}_${Math.floor(time * 10) % 20}`;
        
        // Use cache for performance
        if (this.patternCache.has(cacheKey)) {
            return this.patternCache.get(cacheKey);
        }
        
        const imageData = this.particleCtx.createImageData(patternSize, patternSize);
        
        // Calculate center point in complex plane
        const scale = 1.5 / (patternSize / 80);
        const centerX = -0.5;
        const centerY = 0;
        
        // Add time-based variation
        const timeOffset = Math.sin(time * 0.3) * 0.05;
        
        // Lower resolution for particles
        const step = Math.max(1, Math.floor(patternSize / 60));
        
        for (let py = 0; py < patternSize; py += step) {
            for (let px = 0; px < patternSize; px += step) {
                const real = centerX + (px / patternSize - 0.5) * scale + timeOffset;
                const imag = centerY + (py / patternSize - 0.5) * scale;
                
                const iterations = this.mandelbrotIterations(real, imag);
                const brightness = this.getBWColor(iterations, real, imag);
                
                // Fill block for performance
                for (let dy = 0; dy < step && py + dy < patternSize; dy++) {
                    for (let dx = 0; dx < step && px + dx < patternSize; dx++) {
                        const index = ((py + dy) * patternSize + (px + dx)) * 4;
                        imageData.data[index] = brightness;
                        imageData.data[index + 1] = brightness;
                        imageData.data[index + 2] = brightness;
                        imageData.data[index + 3] = Math.floor(brightness * 0.6);
                    }
                }
            }
        }
        
        // Cache the pattern
        if (this.patternCache.size > 10) {
            const firstKey = this.patternCache.keys().next().value;
            this.patternCache.delete(firstKey);
        }
        this.patternCache.set(cacheKey, imageData);
        
        return imageData;
    }
    
    // Render particles circling the moon
    renderParticles() {
        // Clear previous frame with fade
        this.particleCtx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.particleCtx.fillRect(0, 0, this.width, this.height);
        
        this.updateMoonPosition();
        this.particleAngle += 0.015;
        this.cacheFrame++;
        
        // Update and render each particle
        this.particles.forEach((particle, index) => {
            // Calculate position around moon
            const currentAngle = particle.angle + this.particleAngle * particle.speed + particle.phase;
            const radiusVariation = Math.sin(this.particleAngle * 2 + particle.phase) * 25;
            const currentRadius = particle.radius + radiusVariation;
            
            const x = this.moonX + Math.cos(currentAngle) * currentRadius;
            const y = this.moonY + Math.sin(currentAngle) * currentRadius;
            
            // Size pulsing synced with moon pulse
            const pulsePhase = (this.particleAngle * 3 + particle.phase) % (Math.PI * 2);
            const pulseSize = particle.size * (0.85 + Math.sin(pulsePhase) * 0.15);
            
            // Render Mandelbrot pattern at particle position
            const patternData = this.renderMandelbrotPattern(
                x, 
                y, 
                Math.floor(pulseSize),
                this.particleAngle + particle.phase
            );
            
            // Create temporary canvas for pattern
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = patternData.width;
            tempCanvas.height = patternData.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.putImageData(patternData, 0, 0);
            
            // Draw connection line to moon (subtle)
            this.particleCtx.save();
            this.particleCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            this.particleCtx.lineWidth = 1;
            this.particleCtx.beginPath();
            this.particleCtx.moveTo(this.moonX, this.moonY);
            this.particleCtx.lineTo(x, y);
            this.particleCtx.stroke();
            this.particleCtx.restore();
            
            // Draw pattern with rotation and glow effect
            this.particleCtx.save();
            this.particleCtx.translate(x, y);
            this.particleCtx.rotate(currentAngle * 0.5);
            
            // Add glow
            this.particleCtx.shadowBlur = 15;
            this.particleCtx.shadowColor = 'rgba(255, 255, 255, 0.4)';
            this.particleCtx.globalAlpha = 0.75;
            
            this.particleCtx.drawImage(
                tempCanvas, 
                -patternData.width / 2, 
                -patternData.height / 2
            );
            this.particleCtx.restore();
        });
    }
    
    // Main animation loop
    animate() {
        this.updateAnimation();
        this.render();
        this.renderParticles();
        this.renderVasarelyPatterns();
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the renderer when page loads
window.addEventListener('load', () => {
    const renderer = new MandelbrotRenderer('mandelbrotCanvas');
});
