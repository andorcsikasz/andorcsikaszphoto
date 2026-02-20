/**
 * Portfolio content - photography portfolio data
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
  hoverSrc?: string; // alternate image for crossfade hover
  location?: string;
  year?: number;
}

export interface SandboxProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  year: number;
  status: "ongoing" | "completed" | "shelved";
}

// Hero signature images (6-8s crossfade) - used on the home page
export const heroImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&q=90",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=90",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=90",
];

// Photography section — street, portrait, landscape, travel
export const photographyItems: PortfolioItem[] = [
  {
    id: "p1",
    type: "photo",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    hoverSrc: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=90",
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
    hoverSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=90",
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
    hoverSrc: "https://images.unsplash.com/photo-1500530854317-45ddf163c685?w=1920&q=90",
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
    hoverSrc: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&q=90",
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
    hoverSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
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
    hoverSrc: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=90",
    alt: "Urban night photography",
    title: "City Lights",
    category: "Urban",
    location: "Tokyo",
    year: 2024,
  },
  {
    id: "p7",
    type: "photo",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=90",
    hoverSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90",
    alt: "Forest path in morning light",
    title: "Into the Green",
    category: "Nature",
    location: "Slovenia",
    year: 2024,
  },
  {
    id: "p8",
    type: "photo",
    src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&q=90",
    hoverSrc: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=90",
    alt: "Open road through mountains",
    title: "The Road",
    category: "Travel",
    location: "Faroe Islands",
    year: 2023,
  },
];

// Drone section — aerial photography and video
export const droneItems: PortfolioItem[] = [
  {
    id: "d1",
    type: "photo",
    src: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1920&q=90",
    hoverSrc: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=90",
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
    hoverSrc: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=1920&q=90",
    alt: "Aerial view of mountain range",
    title: "Elevation",
    category: "Aerial",
    location: "Austria",
    year: 2024,
  },
  {
    id: "d3",
    type: "photo",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90",
    hoverSrc: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1920&q=90",
    alt: "Aerial forest pattern",
    title: "Canopy",
    category: "Aerial",
    location: "Finland",
    year: 2023,
  },
  {
    id: "d4",
    type: "photo",
    src: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=1920&q=90",
    hoverSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90",
    alt: "Aerial lake reflection",
    title: "Mirror Lake",
    category: "Aerial",
    location: "Norway",
    year: 2024,
  },
  {
    id: "d5",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=90",
    alt: "Aerial flyover reel",
    title: "Flyover",
    category: "Video",
    location: "Various",
    year: 2024,
  },
  {
    id: "d6",
    type: "photo",
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920&q=90",
    hoverSrc: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=90",
    alt: "Snow-capped peaks from above",
    title: "Whiteout",
    category: "Aerial",
    location: "Switzerland",
    year: 2023,
  },
];

// Sandbox — experiments and personal projects
export const sandboxProjects: SandboxProject[] = [
  {
    id: "s1",
    title: "Long Exposure Studies",
    description:
      "Experimenting with very long exposures — 30 seconds to several minutes — to see how light and motion transform the ordinary. Stars, traffic, waterfalls.",
    tags: ["long exposure", "light painting", "night"],
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=90",
    year: 2024,
    status: "ongoing",
  },
  {
    id: "s2",
    title: "Double Exposure",
    description:
      "In-camera and post double exposures. Portraits overlaid with forests, cities blended with faces. Looking for what happens when two moments share the same frame.",
    tags: ["double exposure", "portrait", "experimental"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=90",
    year: 2024,
    status: "ongoing",
  },
  {
    id: "s3",
    title: "One Roll Project",
    description:
      "A film photography project. One roll of 36 exposures per city. No retakes, no chimp-ing. Just shoot and see what comes back.",
    tags: ["film", "analog", "travel"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=90",
    year: 2023,
    status: "completed",
  },
  {
    id: "s4",
    title: "Compressed Distance",
    description:
      "Telephoto compression used intentionally to flatten landscapes — mountains behind cityscapes, people dwarfed by far-off structures. Playing with perceived scale.",
    tags: ["telephoto", "compression", "landscape"],
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=90",
    year: 2024,
    status: "ongoing",
  },
  {
    id: "s5",
    title: "Monochrome Cities",
    description:
      "Shooting cities exclusively in black and white for a month. Stripping colour forces attention onto geometry, texture, and shadow. Tokyo, Budapest, Lisbon.",
    tags: ["black and white", "urban", "street"],
    image: "https://images.unsplash.com/photo-1500530854317-45ddf163c685?w=1200&q=90",
    year: 2023,
    status: "completed",
  },
  {
    id: "s6",
    title: "Slow Travel",
    description:
      "Two weeks, one country, no flights. A documentary-style series on the texture of a place when you're not rushing — markets, trains, strangers, meals.",
    tags: ["documentary", "travel", "portrait"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=90",
    year: 2023,
    status: "shelved",
  },
];

export const aboutImage =
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&q=90";

export const portfolioConfig = {
  name: "Csíkász Andor",
  email: "andor.csikasz@gmail.com",
  instagram: "https://www.instagram.com/andorcsikasz/",
  twitter: "",
  linkedin: "",
};
