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

// Photography page content
export const photographyIntro = {
  headline: "Photography for me is about holding on to a moment before it’s gone.",
  paragraph1:
    "I picked up a camera in 2022 and haven’t really put it down since. What started as curiosity turned into something I carry everywhere — through 40 countries and counting.",
  paragraph2:
    "I shoot landscapes, people, cities, whatever catches my eye. I’m not interested in perfection. I’m interested in the light, the mood, the feeling of being there. That split second before you move on.",
};

export const photographyServices = [
  {
    id: "wedding",
    title: "Wedding",
    description: "Your day, told honestly. From getting ready to the last dance — I focus on the real moments, the emotions, the small details you’ll want to remember.",
  },
  {
    id: "event",
    title: "Event",
    description: "Corporate events, celebrations, conferences. I document the energy and the people — clean, editorial coverage that tells the story.",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Destination and travel photography. Whether it’s a brand shoot abroad or a personal project, I bring a documentary eye and a love for new places.",
  },
];

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

// Sandbox — projects
export const sandboxProjects: SandboxProject[] = [
  {
    id: "s1",
    title: "ForumApp",
    description: "Platform for young people (16–30) to discover programs, internships, and volunteering. Growth tracking and smart matching.",
    tags: ["startup", "platform", "youth"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    link: "https://p2-forumapp.up.railway.app/en",
    year: 2024,
  },
  {
    id: "s2",
    title: "Anna Papfalusi Photography",
    description: "Photography portfolio — portraits, gallery, pricing, and bookings.",
    tags: ["photography", "portfolio"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    link: "https://p4-papfalusiannaphotography.up.railway.app/#home",
    year: 2024,
  },
  {
    id: "s3",
    title: "FlatMate",
    description: "Verified mid-term rentals in Budapest.",
    tags: ["startup", "housing", "budapest"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    link: "https://flatmate-production-e444.up.railway.app/",
    year: 2024,
  },
  {
    id: "s4",
    title: "VibeCheck",
    description: "Collaborative event management platform.",
    tags: ["startup", "events"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    link: "https://p1-vibecheck.up.railway.app/",
    year: 2024,
  },
];

export const portfolioConfig = {
  name: "Csíkász Andor",
  email: "andor.csikasz@gmail.com",
  instagram: "https://www.instagram.com/andorcsikasz/",
  twitter: "",
  linkedin: "https://www.linkedin.com/in/andorcsikasz",
};
