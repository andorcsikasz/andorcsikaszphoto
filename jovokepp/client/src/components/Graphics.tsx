/** Decorative SVG graphics for the site */
import { motion } from "framer-motion";

export function HeroWave() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-32"
      viewBox="0 0 1440 120"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
        fill="currentColor"
        fillOpacity="0.03"
      />
      <path
        d="M0 100L48 92C96 84 192 68 288 62C384 56 480 60 576 68C672 76 768 88 864 92C960 96 1056 92 1152 82C1248 72 1344 56 1392 48L1440 40V120H0Z"
        fill="#f5f3ef"
      />
    </svg>
  );
}

export function BlobShape({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
    >
      <path
        d="M200 50C280 50 350 120 350 200C350 280 280 350 200 350C120 350 50 280 50 200C50 120 120 50 200 50Z"
        fill="url(#blob-grad)"
        fillOpacity="0.4"
      />
      <defs>
        <linearGradient id="blob-grad" x1="50" y1="50" x2="350" y2="350">
          <stop stopColor="#003399" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function EUStars() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full">
      {[
        [50, 10], [72, 28], [65, 55], [35, 55], [28, 28],
      ].map(([cx, cy], i) => (
        <polygon
          key={i}
          points="50,5 54,18 68,18 57,27 61,40 50,32 39,40 43,27 32,18 46,18"
          transform={`translate(${cx - 50}, ${cy - 25}) scale(0.12)`}
          fill="#003399"
        />
      ))}
    </svg>
  );
}

const FLOATING_SHAPES = [
  { x: "10%", y: "20%", size: 8, delay: 0 },
  { x: "85%", y: "15%", size: 6, delay: 0.5 },
  { x: "25%", y: "60%", size: 10, delay: 1 },
  { x: "90%", y: "55%", size: 5, delay: 0.3 },
  { x: "50%", y: "35%", size: 4, delay: 0.8 },
  { x: "70%", y: "75%", size: 7, delay: 0.2 },
  { x: "15%", y: "80%", size: 6, delay: 0.6 },
  { x: "75%", y: "30%", size: 5, delay: 0.4 },
];

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATING_SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#ffcc00]/40"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function AbstractShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingShapes />
      <svg className="absolute -right-20 -top-20 w-96 h-96 opacity-15" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
        <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
        <circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
      </svg>
      <svg className="absolute -left-10 bottom-1/4 w-64 h-64 opacity-12" viewBox="0 0 200 200">
        <rect x="50" y="50" width="100" height="100" rx="20" stroke="rgba(147,197,253,0.4)" strokeWidth="2" fill="none" transform="rotate(15 100 100)" />
      </svg>
      <svg className="absolute right-1/4 top-1/3 w-48 h-48 opacity-10" viewBox="0 0 100 100">
        <polygon points="50,5 95,75 5,75" stroke="rgba(255,204,0,0.4)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

/** Youth/collaboration illustration - abstract people shapes */
export function PeopleGraphic() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="people-grad" x1="0" y1="0" x2="400" y2="300">
          <stop offset="0%" stopColor="#003399" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* Abstract person shapes */}
      <ellipse cx="120" cy="180" rx="35" ry="45" fill="url(#people-grad)" />
      <ellipse cx="120" cy="140" rx="25" ry="30" fill="url(#people-grad)" />
      <ellipse cx="200" cy="190" rx="40" ry="50" fill="url(#people-grad)" />
      <ellipse cx="200" cy="145" rx="28" ry="35" fill="url(#people-grad)" />
      <ellipse cx="280" cy="180" rx="35" ry="45" fill="url(#people-grad)" />
      <ellipse cx="280" cy="140" rx="25" ry="30" fill="url(#people-grad)" />
      {/* Connecting lines - collaboration */}
      <path d="M155 160 Q200 130 245 160" stroke="#003399" strokeWidth="2" strokeOpacity="0.2" fill="none" strokeDasharray="4 4" />
      <path d="M155 200 Q200 220 245 200" stroke="#003399" strokeWidth="2" strokeOpacity="0.2" fill="none" strokeDasharray="4 4" />
    </svg>
  );
}

export function WaveDivider({ flip = false, color = "#f8fafc" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`absolute left-0 right-0 w-full h-16 sm:h-24 ${flip ? "bottom-0 rotate-180" : "top-0"}`}>
      <svg viewBox="0 0 1440 80" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
