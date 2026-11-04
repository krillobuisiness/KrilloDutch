"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigationItems } from "@/lib/routes";

export function SiteMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <>
      <button
        className="menu-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="site-menu"
        onClick={() => setIsOpen(true)}
      >
        <span className="menu-trigger-icon" aria-hidden="true"><i /><i /><i /></span>
        <span className="menu-trigger-label">Menu</span>
      </button>
      <dialog
        className="menu-dialog"
        id="site-menu"
        aria-labelledby="menu-title"
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="menu-panel">
          <div className="menu-heading">
            <div>
              <span className="eyebrow">THE OBSIDIAN ASCENT</span>
              <h2 id="menu-title">Expeditiekaart</h2>
            </div>
            <button
              className="icon-button menu-close"
              type="button"
              aria-label="Menu sluiten"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <nav className="menu-links" aria-label="Hoofdnavigatie">
            {navigationItems.map((item) => (
              <Link href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                <span className="menu-mark" aria-hidden="true">{item.mark}</span>
                <span>{item.label}</span>
                <span className="menu-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <p className="menu-footnote">ELKE DAG EEN NIEUWE KLIM <span>·</span> KRILLO</p>
        </div>
      </dialog>
    </>
  );
}