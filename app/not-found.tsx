import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="subpage not-found-page">
      <p className="eyebrow"><span className="eyebrow-line" /> BUITEN DE ROUTE</p>
      <h1>DEZE TOP<br />IS <span>ONBEKEND.</span></h1>
      <p>Deze route hebben we nog niet verkend.</p>
      <Link className="button button-primary" href="/">TERUG NAAR HET BASISKAMP <span aria-hidden="true">↗</span></Link>
    </main>
  );
}