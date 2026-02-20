import { sandboxProjects, type SandboxProject } from "@/data/portfolio";
import { motion } from "framer-motion";
import { ArrowSquareOut } from "@phosphor-icons/react";

const ease = [0.25, 0.46, 0.45, 0.94];

function ProjectCard({
  project,
  index,
}: {
  project: SandboxProject;
  index: number;
}) {
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "group block",
      }
    : { className: "group block" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.6, ease, delay: (index % 2) * 0.05 }}
    >
      <Wrapper {...wrapperProps}>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-6 sm:p-8 transition-colors hover:border-border hover:bg-muted/50">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
                {project.title}
              </h2>
              {project.year && (
                <span className="text-[12px] text-muted-foreground mt-0.5 block">
                  {project.year}
                </span>
              )}
            </div>
            {project.link && (
              <ArrowSquareOut
                className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors"
                weight="regular"
              />
            )}
          </div>

          <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded border border-border/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
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
  return (
    <div className="min-h-screen pb-32">
      <div className="container pt-20 sm:pt-24 pb-14 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Sandbox
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
            Projects and startup-related work. Add links when ready.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
          {sandboxProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
