import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LandingPageJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gregstandal.com";
const SITE_NAME = "Greg Standal";
const SITE_DESCRIPTION = "Add 20-30% more booked estimates in 90 days for home improvement & home service contractors. Video marketing system with performance guarantee.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Contractor Marketing`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "contractor marketing",
    "home improvement marketing",
    "video marketing for contractors",
    "lead generation contractors",
    "booked estimates",
    "contractor video production",
    "home service marketing",
    "roofing marketing",
    "HVAC marketing",
    "painting contractor marketing",
    "fencing contractor marketing",
    "plumbing marketing",
    "trust-building content",
    "contractor leads",
    "home service leads",
  ],
  authors: [{ name: "Greg Standal" }],
  creator: "Greg Standal",
  publisher: "New Cape Pictures",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Contractor Marketing`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Add 20-30% More Booked Estimates in 90 Days`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Contractor Marketing`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@gregstandal",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Marketing Services",
  other: {
    "og:locale": "en_US",
    "og:type": "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#002542" },
  ],
};

// Analytics IDs - hardcoded to ensure they're always present in static builds
const GA4_ID = "G-ZCG83580KZ";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;

  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://assets.cdn.filesafe.space" />
        <link rel="preconnect" href="https://newcapepictures.com" />

        {/* DNS prefetch for analytics */}
        {gtmId && <link rel="dns-prefetch" href="https://www.googletagmanager.com" />}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://t.contentsquare.net" />

        {/* Contentsquare / Hotjar */}
        <script src="https://t.contentsquare.net/uxa/9cfa2fdbcd6a6.js" async />

        {/* Favicon and icons */}
        <link rel="icon" href="/GS-favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data */}
        <LandingPageJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager */}
        {gtmId && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
            <Script id="gtm" strategy="afterInteractive">{`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
            `}</Script>
          </>
        )}


        {/* Hotjar */}
        {hotjarId && (
          <Script id="hotjar" strategy="afterInteractive">{`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${Number(hotjarId)},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}</Script>
        )}

        {children}

        <GoogleAnalytics gaId={GA4_ID} />
      </body>
    </html>
  );
}
