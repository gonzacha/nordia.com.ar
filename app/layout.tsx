import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema, generateProductSchema, generateSEOMeta } from "./utils/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateSEOMeta("home", {
  title: "Confirmá turnos por WhatsApp y evitá huecos en la agenda",
  description:
    "Una demo simple de cómo un consultorio puede responder, reservar y recordar turnos sin caos.",
  image: "/iso.png",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-neutral-50 text-neutral-900 selection:bg-nordia selection:text-black`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}
