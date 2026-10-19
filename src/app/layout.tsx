
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://trozensid.github.io/Wedding_Card";
const previewImage = `${siteUrl}/images/wedding-whatsapp-preview.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: "Siddhant & Srishti | A Royal Wedding Invitation",

  description:
    "With the blessings of our families, Siddhant & Srishti invite you to celebrate their wedding. Open your invitation and discover the celebrations.",

  openGraph: {
    title: "Siddhant & Srishti | A Royal Wedding Invitation",
    description:
      "With the blessings of our families, we invite you to celebrate our wedding. Open your invitation and discover the celebrations.",
    url: siteUrl,
    siteName: "Siddhant & Srishti",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "A royal palace wedding celebration for Siddhant & Srishti",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Siddhant & Srishti | A Royal Wedding Invitation",
    description:
      "With the blessings of our families, we invite you to celebrate our wedding.",
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
