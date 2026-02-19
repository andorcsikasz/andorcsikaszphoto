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
    src: "/portfolio/photo-1.svg",
    alt: "Your photo",
    title: "Add your title",
    category: "Category",
  },
  {
    id: "2",
    type: "photo",
    src: "/portfolio/photo-2.svg",
    alt: "Your photo",
    title: "Add your title",
    category: "Category",
  },
  {
    id: "3",
    type: "photo",
    src: "/portfolio/photo-3.svg",
    alt: "Your photo",
    title: "Add your title",
    category: "Category",
  },
  {
    id: "4",
    type: "photo",
    src: "/portfolio/photo-4.svg",
    alt: "Your photo",
    title: "Add your title",
    category: "Category",
  },
  {
    id: "5",
    type: "photo",
    src: "/portfolio/photo-5.svg",
    alt: "Your photo",
    title: "Add your title",
    category: "Category",
  },
  {
    id: "6",
    type: "photo",
    src: "/portfolio/photo-6.svg",
    alt: "Your photo",
    title: "Add your title",
    category: "Category",
  },
  {
    id: "7",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "/portfolio/video-poster.svg",
    alt: "Your video - replace src with /portfolio/video-1.mp4 when ready",
    title: "Add your title",
    category: "Video",
  },
];

export const portfolioConfig = {
  name: "Csíkász Andor",
  tagline: "Photographer & Visual Artist",
  email: "hello@example.com",
  instagram: "https://www.instagram.com/andorcsikasz/",
  twitter: "",
  linkedin: "",
};
