import type { Metadata } from "next";
import "./obsidian.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "KRILLO | The Obsidian Ascent",
  description: "Een berg. Zeven etappes. Vind jouw weg naar de top.",
  applicationName: "KRILLO"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">Ga naar de inhoud</a>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}