
import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  "https://trozensid.github.io/Srishti-Siddhant-Wedding";

const previewImage =
  `${siteUrl}/images/wedding-whatsapp-preview.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: "Srishti & Siddhant | A Beautiful Beginning",

  description:
    "With the love and blessings of our families, we invite you to be part of our special day. Come celebrate love, happiness and togetherness.",

  openGraph: {
    title: "Srishti & Siddhant | A Beautiful Beginning",
    description:
      "With the love and blessings of our families, we invite you to be part of our special day. Come celebrate love, happiness and togetherness.",
    url: siteUrl,
    siteName: "Srishti & Siddhant",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Srishti & Siddhant - A Beautiful Beginning",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Srishti & Siddhant | A Beautiful Beginning",
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
