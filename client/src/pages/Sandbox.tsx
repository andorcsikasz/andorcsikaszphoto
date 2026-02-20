import { sandboxProjects, type SandboxProject } from "@/data/portfolio";
import { motion } from "framer-motion";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const springSoft = { type: "spring" as const, stiffness: 260, damping: 28 };

function ProjectCard({
  project,
  index,
}: {
  project: SandboxProject;
  index: number;
}) {
  const reduced = useReducedMotion();
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl",
      }
    : { className: "group block" };

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={
        reduced ? { duration: 0 } : { ...springSoft, delay: (index % 2) * 0.04 }
      }
    >
      <Wrapper {...wrapperProps}>
        <div className="rounded-xl sm:rounded-2xl border border-border/50 bg-muted/20 p-6 sm:p-8 transition-all duration-300 hover:border-border hover:bg-muted/40 hover:shadow-lg hover:shadow-black/5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-foreground leading-snug group-hover:text-foreground/90 transition-colors">
                {project.title}
              </h2>
              {project.year && (
                <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block">
                  {project.year}
                </span>
              )}
            </div>
            {project.link && (
              <ArrowSquareOut
                className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 group-hover:text-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                weight="regular"
              />
            )}
          </div>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-md border border-border/60 bg-background/50 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </motion.article>
  );
}

export default function Sandbox() {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen pb-24 sm:pb-32">
      <div className="container pt-16 sm:pt-20 pb-12 sm:pb-16 scroll-mt-20">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : spring}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Sandbox
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
            Projects and startup-related work.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
          {sandboxProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
