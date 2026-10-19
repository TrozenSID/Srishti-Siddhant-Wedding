import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Siddhant & Srishti | A Royal Wedding Invitation", description: "With the blessings of our families, Siddhant & Srishti invite you to celebrate their wedding." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
