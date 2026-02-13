import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Menu } from "@/app/components/Menu/Menu";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paulovieira.site"),
  title: {
    default: "Paulo Vieira | Desenvolvedor Full Stack",
    template: "%s | Paulo Vieira",
  },
  description:
    "Portifolio de Paulo Vieira, desenvolvedor full stack com foco em Next.js, React, Node.js e e-commerce.",
  alternates: {
    canonical: "https://paulovieira.site",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://paulovieira.site",
    title: "Paulo Vieira | Desenvolvedor Full Stack",
    description:
      "Projetos, experiencias e habilidades em desenvolvimento full stack com foco em performance e escalabilidade.",
    siteName: "Paulo Vieira Portifolio",
    images: [
      {
        url: "https://paulovieira.site/assets/vercel-icon-light.png",
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

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://paulovieira.site/#person",
        name: "Paulo Vieira",
        url: "https://paulovieira.site",
        jobTitle: "Desenvolvedor Full Stack",
        description:
          "Especialista em Next.js, Stripe e arquitetura de e-commerce headless.",
        sameAs: [
          "https://github.com/PauloIletski",
          "https://linkedin.com/in/PauloIletski",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://paulovieira.site/#website",
        url: "https://paulovieira.site",
        name: "Paulo Vieira Portfólio",
        publisher: {
          "@id": "https://paulovieira.site/#person",
        },
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      </head>
    
      

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Script
        id="gtm-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `,
        }}
      />
        <Analytics />
        <SpeedInsights />
        <Menu />
        {children}
      </body>
    </html>
  );
}
