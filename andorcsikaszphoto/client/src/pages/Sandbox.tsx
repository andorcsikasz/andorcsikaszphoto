import { sandboxProjects, type SandboxProject } from "@/data/portfolio";
import { motion } from "framer-motion";
import {
  ArrowSquareOut,
  Camera,
  CalendarDots,
  House,
  Users,
} from "@phosphor-icons/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { funnel } from "@/lib/funnel";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const springSoft = { type: "spring" as const, stiffness: 260, damping: 28 };

function getProjectVisual(projectId: string) {
  switch (projectId) {
    case "s1":
      return {
        Icon: Users,
        bgClass:
          "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500",
      };
    case "s2":
      return {
        Icon: Camera,
        bgClass:
          "bg-gradient-to-br from-rose-500 via-fuchsia-500 to-purple-600",
      };
    case "s3":
      return {
        Icon: House,
        bgClass: "bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500",
      };
    case "s4":
      return {
        Icon: CalendarDots,
        bgClass:
          "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500",
      };
    default:
      return {
        Icon: Users,
        bgClass: "bg-gradient-to-br from-slate-500 to-slate-700",
      };
  }
}

function ProjectCard({
  project,
  index,
}: {
  project: SandboxProject;
  index: number;
}) {
  const reduced = useReducedMotion();
  const Wrapper = project.link ? "a" : "div";
  const { Icon, bgClass } = getProjectVisual(project.id);
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () =>
          funnel.sandboxProjectClick(project.id, project.title, project.link),
        className:
          "group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl",
      }
    : { className: "group block h-full" };

  return (
    <motion.article
      className="h-full"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={
        reduced ? { duration: 0 } : { ...springSoft, delay: index * 0.06 }
      }
      whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
    >
      <Wrapper {...wrapperProps}>
        <div className="h-full rounded-xl sm:rounded-2xl border border-border bg-card overflow-hidden shadow-lg shadow-black/10 transition-shadow duration-300 ease-out group-hover:shadow-xl group-hover:shadow-black/15 flex flex-col">
          <div className={`h-36 ${bgClass} relative`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="h-14 w-14 text-white" weight="duotone" />
            </div>
          </div>
          <div className="p-6 sm:p-8 flex flex-1 flex-col">
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
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-foreground">
            Sandbox
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
            Projects and startup-related work.
          </p>
        </motion.div>
      </div>

      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:[grid-auto-rows:1fr] gap-6 sm:gap-8 lg:gap-10">
          {sandboxProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
