import Link from "next/link";
import { notFound } from "next/navigation";
import { placeholderPages } from "@/lib/routes";

export function generateStaticParams() {
  return Object.keys(placeholderPages).map((slug) => ({ slug }));
}

export default async function PlaceholderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = placeholderPages[slug];
  if (!page) notFound();

  return (
    <main id="main" className="subpage placeholder-page">
      <div className="subpage-kicker"><span className="eyebrow-line" /> VERKEN DE BERG <span>IN ONTWIKKELING</span></div>
      <div className="placeholder-content">
        <p className="placeholder-coordinate">EXPEDITIE / ROUTE 001</p>
        <h1>{page.title}</h1>
        <p className="placeholder-intro">{page.intro}</p>
        <div className="coming-soon"><span className="coming-soon-symbol" aria-hidden="true">✳</span><span>DEZE ROUTE WORDT NOG VERKEND</span></div>
        <Link className="button button-primary" href="/game">NAAR DE DAGELIJKSE KLIM <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}