/**
 * Funnel & analytics: page views + key conversion events.
 * Events are sent to /api/funnel in production; dev logs to console.
 * Use Railway Metrics / external analytics (Plausible, GA) with these event names.
 */

const ENDPOINT = "/api/funnel";

export type FunnelEvent =
  | { name: "page_view"; path: string; title?: string }
  | { name: "contact_link"; type: "email" | "instagram" | "linkedin" }
  | { name: "sandbox_project_click"; projectId: string; projectTitle: string; link: string }
  | { name: "photography_section"; section: string }
  | { name: "drone_section"; section: string };

function send(event: FunnelEvent) {
  const payload = {
    ...event,
    timestamp: new Date().toISOString(),
    path: typeof window !== "undefined" ? window.location.pathname : "",
  };
  if (import.meta.env.DEV) {
    console.debug("[funnel]", event.name, payload);
  }
  try {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // no-op
  }
}

export const funnel = {
  pageView(path: string, title?: string) {
    send({ name: "page_view", path, title });
  },
  contactLink(type: "email" | "instagram" | "linkedin") {
    send({ name: "contact_link", type });
  },
  sandboxProjectClick(projectId: string, projectTitle: string, link: string) {
    send({ name: "sandbox_project_click", projectId, projectTitle, link });
  },
  photographySection(section: string) {
    send({ name: "photography_section", section });
  },
  droneSection(section: string) {
    send({ name: "drone_section", section });
  },
};
