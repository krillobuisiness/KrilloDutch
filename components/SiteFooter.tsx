import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" href="/">KRILLO<span>.</span></Link>
      <p>Voor wie hoger durft te kijken.</p>
      <Link href="/faq">Vragen? Bekijk de FAQ <span aria-hidden="true">↗</span></Link>
      <span className="footer-copy">© 2025 KRILLO</span>
    </footer>
  );
}