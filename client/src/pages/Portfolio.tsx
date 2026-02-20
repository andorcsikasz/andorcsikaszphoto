import { motion } from "framer-motion";
import { Link } from "wouter";

const ease = [0.22, 1, 0.36, 1];

const links = [
  { href: "/photography", label: "Photography" },
  { href: "/drone", label: "Drone" },
  { href: "/sandbox", label: "Sandbox" },
];

export default function Portfolio() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center">
      <div className="container">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
            My work.
          </h1>
          <p className="mt-3 text-xl sm:text-2xl text-muted-foreground font-light">
            Recently
          </p>

          <nav className="mt-16 flex flex-col gap-2 sm:gap-3">
            {links.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="block text-[15px] sm:text-base font-medium text-foreground hover:text-muted-foreground transition-colors w-fit"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      </div>
    </div>
  );
}
