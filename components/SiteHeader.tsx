import Link from "next/link";
import { SiteMenu } from "@/components/SiteMenu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link aria-label="KRILLO, naar de startpagina" className="brand" href="/">
        <span className="brand-mark" aria-hidden="true">K</span>
        <span>KRILLO<span className="brand-period">.</span></span>
      </Link>
      <div className="header-right">
        <span className="header-status"><span className="status-dot" /> KLIMROUTE / OPEN</span>
        <SiteMenu />
      </div>
    </header>
  );
}