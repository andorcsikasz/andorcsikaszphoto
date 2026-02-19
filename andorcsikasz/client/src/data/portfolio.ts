/**
 * Portfolio content - add your photos and videos to client/public/portfolio/
 *
 * To add your content:
 * - Photos: Replace photo-1.svg..photo-6.svg with your images (e.g. photo-1.jpg)
 *          and update the src and alt below.
 * - Video:  Add video-1.mp4 and video-poster.jpg, then update src and poster below.
 */

export type MediaType = "photo" | "video";

export interface PortfolioItem {
  id: string;
  type: MediaType;
  src: string;
  poster?: string; // thumbnail for videos
  alt: string;
  title?: string;
  category?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    type: "photo",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    alt: "Mountain landscape at golden hour",
    title: "Alpine Dawn",
    category: "Landscape",
  },
  {
    id: "2",
    type: "photo",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=90",
    alt: "Portrait in natural light",
    title: "Portrait",
    category: "People",
  },
  {
    id: "3",
    type: "photo",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=90",
    alt: "Mountain vista",
    title: "Vista",
    category: "Landscape",
  },
  {
    id: "4",
    type: "photo",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90",
    alt: "Beach and ocean",
    title: "Shoreline",
    category: "Nature",
  },
  {
    id: "5",
    type: "photo",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=90",
    alt: "Northern lights over mountains",
    title: "Aurora",
    category: "Landscape",
  },
  {
    id: "6",
    type: "photo",
    src: "https://images.unsplash.com/photo-1500530854317-45ddf163c685?w=1920&q=90",
    alt: "Urban night photography",
    title: "City Lights",
    category: "Urban",
  },
  {
    id: "7",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&q=90",
    alt: "Sample video",
    title: "Motion",
    category: "Video",
  },
];

export const portfolioConfig = {
  name: "Csíkász Andor",
  tagline: "Photographer & Visual Artist",
  email: "andor.csikasz@gmail.com",
  instagram: "https://www.instagram.com/andorcsikasz/",
  twitter: "",
  linkedin: "",
};
