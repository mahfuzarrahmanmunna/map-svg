import "./globals.css";
import type { Metadata, Viewport } from "next";

// ==========================================
// SEO METADATA CONFIGURATION
// ==========================================

export const metadata: Metadata = {
  // The absolute URL of your website (Change this to your real domain)
  metadataBase: new URL("https://cartographix-pro.com"),
  
  title: {
    default: "Cartographix Pro — Premium 3D Map Studio & SVG Generator",
    template: "%s | Cartographix Pro", // Dynamically adds brand name to sub-pages
  },
  
  description: "Generate, customize, and export premium 3D vector maps. Cartographix Pro is the ultimate SaaS tool for developers, designers, and urban planners to create high-quality SVG maps from live OpenStreetMap data.",
  
  keywords: [
    "3D Map Generator",
    "Vector Map Export",
    "SVG Map Maker",
    "OpenStreetMap API",
    "Map Design Tool",
    "SaaS Map Studio",
    "Cartographix Pro",
    "Isometric Map Creator",
    "Urban Planning Software",
    "Custom Map Builder"
  ],
  
  authors: [{ name: "Cartographix Pro Team" }],
  creator: "Cartographix Pro",
  publisher: "Cartographix Pro",
  
  // Robots configuration for search engine crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  
  // Canonical URL to prevent duplicate content issues
  alternates: {
    canonical: "https://cartographix-pro.com",
  },
  
  // Open Graph for Facebook, LinkedIn, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cartographix-pro.com",
    siteName: "Cartographix Pro",
    title: "Cartographix Pro — Premium 3D Map Studio",
    description: "Create, customize, and export stunning 3D vector maps in SVG format. Perfect for real estate, urban planning, and custom applications.",
    images: [
      {
        url: "/og-image.png", // Make sure to add an image in /public folder
        width: 1200,
        height: 630,
        alt: "Cartographix Pro Map Studio Dashboard",
      },
    ],
  },
  
  // Twitter Card configuration
  twitter: {
    card: "summary_large_image",
    title: "Cartographix Pro — Premium 3D Map Studio",
    description: "Generate, customize, and export premium 3D vector maps online.",
    images: ["/og-image.png"],
  },
  
  // Additional meta tags
  other: {
    "theme-color": "#020617",
    "application-name": "Cartographix Pro",
  },
};

// Viewport configuration (Next.js 14+ best practice)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617",
};

// ==========================================
// LAYOUT COMPONENT
// ==========================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD) for Rich Snippets
  // Tells Google this is a WebApplication SaaS tool
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cartographix Pro",
    url: "https://cartographix-pro.com",
    description: "SaaS tool for generating, customizing, and exporting premium 3D vector maps (SVG) from live OpenStreetMap data.",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Cartographix Pro",
    },
    featureList: [
      "3D Isometric Map Generation",
      "Live OpenStreetMap Data Fetching",
      "Custom Color Templates",
      "SVG Vector Export",
      "Global Location Search"
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Inject Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}