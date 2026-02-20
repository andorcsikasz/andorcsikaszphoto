import { motion } from "framer-motion";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LanyardScene } from "@/components/LanyardScene";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const springStagger = { type: "spring" as const, stiffness: 260, damping: 28 };

export default function Portfolio() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.5rem)] overflow-hidden">
      <LanyardScene />
      <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
        <div className="pointer-events-auto container pb-12 sm:pb-16">
          <motion.div
            className="max-w-2xl"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { ...spring, delay: 0.3 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
              My work.
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-muted-foreground font-light">
              Recently
            </p>

            <nav
              className="mt-10 sm:mt-12 flex flex-col gap-2 sm:gap-3"
              aria-label="Work sections"
            >
              {[
                { href: "/photography", label: "Photography" },
                { href: "/drone", label: "Drone" },
                { href: "/sandbox", label: "Sandbox" },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { ...springStagger, delay: 0.4 + i * 0.06 }
                  }
                >
                  <Link
                    href={item.href}
                    className="block text-base sm:text-lg font-medium text-foreground hover:text-muted-foreground transition-colors duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
