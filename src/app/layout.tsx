
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://trozensid.github.io/Wedding_Card";
const previewImage = `${siteUrl}/images/wedding-whatsapp-preview.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: "Siddhant & Srishti | A Beautiful Beginning",

  description:
    "With the love and blessings of our families, we invite you to be part of our special day. Come celebrate love, happiness and togetherness.",

  openGraph: {
    title: "Siddhant & Srishti | A Beautiful Beginning",
    description:
      "With the love and blessings of our families, we invite you to be part of our special day. Come celebrate love, happiness and togetherness.",
    url: siteUrl,
    siteName: "Siddhant & Srishti",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Siddhant & Srishti - A Beautiful Beginning",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Siddhant & Srishti | A Beautiful Beginning",
    description:
      "With the love and blessings of our families, we invite you to be part of our special day.",
    images: [previewImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
