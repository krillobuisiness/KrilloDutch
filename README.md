# KRILLO

Een Nederlandstalige eerste versie van KRILLO — The Obsidian Ascent: een dagelijkse expeditie naar de top van een mysterieuze berg.

## Starten

Vereist Node.js 20.9 of nieuwer.

```bash
npm install
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000). `npm run build` maakt een productiebuild en `npm run typecheck` controleert TypeScript.

## Opzet

- Next.js App Router, React en TypeScript; Tailwind CSS 4 is beschikbaar naast eigen CSS voor de art direction.
- De menulinks en placeholderteksten staan centraal in `lib/routes.ts`.
- De dialog-navigatie gebruikt het ingebouwde HTML `<dialog>`-element voor toetsenbordfocus, Escape-sluiten en mobiel gedrag.
- De homepage gebruikt een aparte CSS-bergsilhouetscène in `components/MountainScene.tsx`; die kan later door definitieve illustratie worden vervangen.
- `/game` bevat een speelbare singleplayer-ronde met preview, timer, open antwoorden, zeldzaamheidsscore, timeout en eindoverzicht.
- De testbare spelregels staan in `lib/game/engine.js`; `lib/game/engine.d.ts` beschrijft de gedeelde TypeScript-contracten.
- `lib/game/test-fixtures.js` bevat uitsluitend herkenbaar gemarkeerde demo-vragen. De officiële databank met 393 antwoordrecords is niet aanwezig; productievragen zijn niet nagemaakt.
- De overige gevraagde routes zijn consistente placeholders.

## Speltests

```bash
npm test
npm run typecheck
npm run build
```

## Visuele richting

Het ontwerp gebruikt Obsidian Black, Storm Charcoal, Deep Moss, Ash Stone, Ancient Fog en spaarzaam Aged Gold. De CSS-scène is een tijdelijke originele compositie van berglagen, mist, licht en een silhouet van een berggeit; zij bevat geen externe of gekopieerde illustraties.