import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema, generateProductSchema } from "./utils/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nordia — Sistema conversacional para negocios",
  description:
    "Operá tu negocio a través de WhatsApp. Instrucciones del equipo, ejecución del sistema, atención al cliente. Todo registrado.",
};

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
