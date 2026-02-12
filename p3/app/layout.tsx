import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Professzionális Kárpittisztítás Budapest | Orvosi Szintű Mélytisztítás",
  description:
    "Orvosi szintű kárpittisztítás Budapesten. Professzionális mélytisztítás allergénmentesítéssel. Kanapé, matrac és szőnyeg tisztítás.",
  keywords: "kárpittisztítás Budapest, kanapé tisztítás, matrac tisztítás, szőnyeg tisztítás",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Professzionális Kárpittisztítás Budapest",
    description:
      "Orvosi szintű mélytisztítás allergénmentesítéssel. Kanapé, matrac és szőnyeg tisztítás.",
    url: "https://weclean.hu",
    telephone: "+36-XX-XXX-XXXX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Budapest",
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "47.4979",
      longitude: "19.0402",
    },
    priceRange: "$$",
    image: "https://weclean.hu/og-image.jpg",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "150",
    },
    areaServed: {
      "@type": "City",
      name: "Budapest",
    },
    serviceType: "Kárpittisztítás",
    keywords: "kárpittisztítás Budapest, kanapé tisztítás, matrac tisztítás, szőnyeg tisztítás",
  }

  return (
    <html lang="hu">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

