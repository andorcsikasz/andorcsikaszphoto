/**
 * Portfolio content — add your photos, videos, and project links here
 */

export type MediaType = "photo" | "video";

export interface PortfolioItem {
  id: string;
  type: MediaType;
  src: string;
  poster?: string;
  alt: string;
  title?: string;
  category?: string;
  location?: string;
  year?: number;
}

export interface SandboxProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string; // external URL — add later
  year?: number;
}

// Single hero image for home — replace with your own
export const heroImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90";

// Photography — add your photos later
export const photographyItems: PortfolioItem[] = [
  {
    id: "p1",
    type: "photo",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    alt: "Mountain landscape at golden hour",
    title: "Alpine Dawn",
    category: "Landscape",
    location: "Swiss Alps",
    year: 2024,
  },
  {
    id: "p2",
    type: "photo",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=90",
    alt: "Portrait in natural light",
    title: "Still",
    category: "Portrait",
    location: "Budapest",
    year: 2024,
  },
  {
    id: "p3",
    type: "photo",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=90",
    alt: "Mountain vista",
    title: "Vista",
    category: "Landscape",
    location: "Dolomites",
    year: 2023,
  },
  {
    id: "p4",
    type: "photo",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90",
    alt: "Beach and ocean",
    title: "Shoreline",
    category: "Nature",
    location: "Greece",
    year: 2023,
  },
  {
    id: "p5",
    type: "photo",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=90",
    alt: "Northern lights over mountains",
    title: "Aurora",
    category: "Landscape",
    location: "Iceland",
    year: 2023,
  },
  {
    id: "p6",
    type: "photo",
    src: "https://images.unsplash.com/photo-1500530854317-45ddf163c685?w=1920&q=90",
    alt: "Urban night photography",
    title: "City Lights",
    category: "Urban",
    location: "Tokyo",
    year: 2024,
  },
];

// Drone — add your videos/photos later
export const droneItems: PortfolioItem[] = [
  {
    id: "d1",
    type: "photo",
    src: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1920&q=90",
    alt: "Aerial view of coastal cliffs",
    title: "Coastal Edge",
    category: "Aerial",
    location: "Ireland",
    year: 2024,
  },
  {
    id: "d2",
    type: "photo",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=90",
    alt: "Aerial view of mountain range",
    title: "Elevation",
    category: "Aerial",
    location: "Austria",
    year: 2024,
  },
  {
    id: "d3",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=90",
    alt: "Aerial flyover reel",
    title: "Flyover",
    category: "Video",
    location: "Various",
    year: 2024,
  },
];

// Sandbox — projects with links (add URLs later)
export const sandboxProjects: SandboxProject[] = [
  {
    id: "s1",
    title: "Project Alpha",
    description: "Startup-related project. Link to be added.",
    tags: ["startup", "product"],
    link: undefined, // add URL when ready
    year: 2024,
  },
  {
    id: "s2",
    title: "Project Beta",
    description: "Another venture or experiment.",
    tags: ["startup"],
    link: undefined,
    year: 2024,
  },
];

export const portfolioConfig = {
  name: "Csíkász Andor",
  email: "andor.csikasz@gmail.com",
  instagram: "https://www.instagram.com/andorcsikasz/",
  twitter: "",
  linkedin: "",
};
