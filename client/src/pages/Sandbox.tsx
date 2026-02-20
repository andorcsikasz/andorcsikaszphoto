import { sandboxProjects, type SandboxProject } from "@/data/portfolio";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94];

const statusLabel: Record<SandboxProject["status"], string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  shelved: "Shelved",
};

const statusColor: Record<SandboxProject["status"], string> = {
  ongoing: "text-emerald-600 dark:text-emerald-400",
  completed: "text-muted-foreground",
  shelved: "text-amber-600 dark:text-amber-400",
};

function ProjectCard({
  project,
  index,
}: {
  project: SandboxProject;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.65, ease, delay: (index % 2) * 0.08 }}
      className="group"
    >
      <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 aspect-[4/3] relative">
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease }}
        />
        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${statusColor[project.status]}`}
          >
            {project.status === "ongoing" && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
            {statusLabel[project.status]}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[15px] font-semibold text-foreground leading-snug group-hover:text-foreground/70 transition-colors duration-200">
            {project.title}
          </h2>
          <span className="text-[12px] text-muted-foreground shrink-0">{project.year}</span>
        </div>

        <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Sandbox() {
  return (
    <div className="min-h-screen pb-32">
      {/* Page header */}
      <div className="container pt-16 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Sandbox
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
            Personal experiments and ongoing projects. Things that don't fit neatly anywhere else.
          </p>
        </motion.div>
      </div>

      {/* Projects grid */}
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {sandboxProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
