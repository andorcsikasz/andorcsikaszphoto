import { motion } from "framer-motion";

const COLORS = ["#ffcc00", "#003399", "#22c55e", "#ef4444", "#8b5cf6", "#06b6d4"];
const PARTICLE_OFFSETS = Array.from({ length: 40 }, () => ({
  x: (Math.random() - 0.5) * 420,
  y: (Math.random() - 0.5) * 420,
  rotate: Math.random() * 720 - 360,
}));

export function ConfettiBurst({
  onComplete,
  particles = 40,
}: {
  onComplete?: () => void;
  particles?: number;
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden flex items-center justify-center">
      <div className="relative w-0 h-0">
        {PARTICLE_OFFSETS.slice(0, particles).map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: 0,
              top: 0,
              marginLeft: -6,
              marginTop: -6,
              backgroundColor: COLORS[i % COLORS.length],
            }}
            initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.2, 0.6],
              x: pos.x,
              y: pos.y,
              rotate: pos.rotate,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            onAnimationComplete={i === particles - 1 ? onComplete : undefined}
          />
        ))}
      </div>
    </div>
  );
}
