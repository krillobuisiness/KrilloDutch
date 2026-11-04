import Link from "next/link";
import { HomeHeroArtwork } from "@/components/GameArtwork";

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero-section" aria-labelledby="hero-title">
        <HomeHeroArtwork />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> KRILLO <span className="eyebrow-number">/ THE OBSIDIAN ASCENT</span></p>
          <h1 id="hero-title">DE TOP<br /><em>WACHT.</em></h1>
          <p className="hero-description">Een stille klim door een wereld van steen en mist. Zeldzame antwoorden brengen je verder, etappe voor etappe.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/game">
              BEGIN DE KLIM <span aria-hidden="true">↗</span>
            </Link>
            <span className="hero-note">EXPEDITIE 001</span>
          </div>
          <div className="hero-meta" aria-label="Aantal vragen en tijd per vraag">
            <span><strong>07</strong> VRAGEN</span>
            <span className="meta-divider" aria-hidden="true" />
            <span><strong>25</strong> SEC. PER VRAAG</span>
          </div>
        </div>
      </section>

      <section className="expedition-strip" aria-label="De dagelijkse expeditie">
        <p className="fact-intro">VANDAAG OP<br />DE BERG<span>.</span></p>
        <div className="fact-item"><span className="fact-number">01</span><p>Dezelfde route<br />voor iedereen.</p></div>
        <div className="fact-item"><span className="fact-number">02</span><p>Zeldzaam goed?<br />Jij komt verder.</p></div>
        <div className="route-progress" aria-label="Routekaart met zeven etappes">
          <div className="route-progress-label"><span>ROUTEKAART</span><strong>07 ETAPPES</strong></div>
          <div className="route-progress-track" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
        </div>
      </section>

      <section className="how-section" aria-labelledby="how-title">
        <div className="how-heading">
          <p className="eyebrow"><span className="eyebrow-line" /> DE DAGELIJKSE EXPEDITIE</p>
          <h2 id="how-title">Elke stap brengt<br />je dichterbij.</h2>
        </div>
        <div className="how-detail">
          <p>Zeven vragen markeren de route naar boven. Neem de tijd, kies je antwoord en ontdek hoe ver je komt.</p>
          <Link className="text-link" href="/game">BEKIJK DE EXPEDITIE <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <div className="bottom-current" aria-hidden="true"><span /><span /><span /></div>
    </main>
  );
}