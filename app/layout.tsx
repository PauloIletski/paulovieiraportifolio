import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Menu } from "@/app/components/Menu/Menu";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paulovieira.dev"),
  title: {
    default: "Paulo Vieira | Desenvolvedor Full Stack",
    template: "%s | Paulo Vieira",
  },
  description:
    "Portifolio de Paulo Vieira, desenvolvedor full stack com foco em Next.js, React, Node.js e e-commerce.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Paulo Vieira | Desenvolvedor Full Stack",
    description:
      "Projetos, experiencias e habilidades em desenvolvimento full stack com foco em performance e escalabilidade.",
    siteName: "Paulo Vieira Portifolio",
    images: [
      {
        url: "/vercel",
        width: 1200,
        height: 630,
        alt: "Paulo Vieira - Desenvolvedor Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulo Vieira | Desenvolvedor Full Stack",
    description:
      "Projetos, experiencias e habilidades em desenvolvimento full stack com foco em performance e escalabilidade.",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        <Menu />
        {children}
      </body>
    </html>
  );
}
