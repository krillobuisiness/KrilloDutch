# KRILLO artwork import pack

Deze mapstructuur is bedoeld om vanaf de repository-root in de bestaande KRILLO Codespace te worden samengevoegd.
Bronbestanden zijn hernoemd naar consistente, versievaste bestandsnamen. De originele inhoud is niet aangepast.

## Bestandsmapping en toegestane toepassing

| Nieuw pad | Bronbestand | Afmetingen | Rol | Gebruik |
|---|---|---:|---|---|
| `public/assets/krillo/environments/gateway-sun-v01.png` | `Colossale Poort naar de Zon(1).png` | 1536×1024 | ENVIRONMENT | Standalone monumental gateway scene without goat; use as an environment/background scene. |
| `public/assets/krillo/environments/the-infinite-hero-v01.png` | `Berggeit boven eindeloze stenen poorten(3).png` | 1672×941 | ENVIRONMENT | Wide homepage/game-intro hero composition with a small goat already in the scene. Do not overlay another goat on top. |
| `public/assets/krillo/environments/goat-walking-ruins-scene-v01.png` | `Berggeit in een gouden ruïnelandschap-1.png` | 1774×887 | SCENE | Complete walking-goat scene in the world; not an isolated sprite. |
| `public/assets/krillo/environments/goat-climbing-stairs-scene-v01.png` | `Berggeit op oude hemeltrappen(1).png` | 1536×1024 | SCENE | Complete climbing-goat scene on monumental stairs; not an isolated sprite. |
| `public/assets/krillo/environments/goat-standing-platform-scene-v01.png` | `Berggeit in een Gouden Archipel(2).png` | 1536×1024 | SCENE | Complete standing-goat scene on a stone platform; not an isolated sprite. |
| `docs/artwork-references/goat-master-sheet-v01.png` | `Berggeit concept artstudie met detailpanelen(2).png` | 1774×887 | REFERENCE ONLY | Character turnaround/reference sheet. Never display as a player-facing image. |
| `docs/artwork-references/composition-board-v01.png` | `KRILLO_ Poorten van Goud en Mist.png` | 1672×941 | REFERENCE ONLY | Composite multi-panel concept board. Reference only; never display as a runtime image. |
| `docs/artwork-references/character-variants/goat-walking-variant-01-checkerboard-baked.png` | `Wandelende Alpensteenbok met Grote Hoorns-4.png` | 1536×1024 | REFERENCE ONLY | Walking character study. Checkerboard is baked into opaque RGB pixels; not a transparent sprite. |
| `docs/artwork-references/character-variants/goat-walking-variant-02-white-background.png` | `Wandelende berggeit met grote hoorns-5.png` | 1774×887 | REFERENCE ONLY | Walking character study on white background; not a transparent sprite. |
| `docs/artwork-references/character-variants/goat-walking-variant-03-checkerboard-baked.png` | `Wandelende berggeit met grote hoorns-6.png` | 1536×1024 | REFERENCE ONLY | Walking character study. Checkerboard is baked into opaque RGB pixels; not a transparent sprite. |
| `docs/artwork-references/character-variants/goat-climbing-variant-01-checkerboard-baked.png` | `Berggeit op rotsachtige treden-3.png` | 1774×887 | REFERENCE ONLY | Climbing character study. Checkerboard-style background is baked in; not a transparent sprite. |
| `docs/artwork-references/character-variants/goat-walking-variant-04-checkerboard-baked.png` | `Wandelende berggeit met grote hoorns-2.png` | 1536×1024 | REFERENCE ONLY | Walking character study. Checkerboard is baked into opaque RGB pixels; not a transparent sprite. |

## Belangrijke transparantiecontrole

De vijf bestanden in `docs/artwork-references/character-variants/` zijn geen bruikbare transparante sprites. Bij inspectie heeft hun alpha-kanaal volledig de waarde 255; het zichtbare schaakbord of de witte achtergrond zit dus in de afbeelding zelf. Gebruik ze uitsluitend als interne pose-/vormreferentie. Plaats deze niet als losse personages in de game en probeer niet met CSS `background: transparent` te doen alsof ze transparant zijn.

De samengestelde `goat-master-sheet-v01.png` en `composition-board-v01.png` zijn eveneens uitsluitend interne referenties.

## Voorgestelde plaatsing in KRILLO

- Homepage `/`: gebruik `the-infinite-hero-v01.png` als hoofdcompositie. Deze afbeelding bevat al een kleine geit; plaats geen tweede geit erbovenop.
- `/game` introductie: gebruik `gateway-sun-v01.png` als omgevingsbeeld voor de introductie. Stapel deze niet boven op de homepage-hero.
- Bestaande correcte-antwoordfeedback: gebruik `goat-walking-ruins-scene-v01.png` in het bestaande illustratie-/feedbackvak. Dit is een complete scène, geen losse sprite.
- Bestaande feedback voor de hoogste bestaande zeldzaamheidsniveaus (`DEEP CUT` en `ONE IN A KRILLION`): gebruik `goat-climbing-stairs-scene-v01.png` in hetzelfde feedbackvak, uitsluitend als die state al bestaat. Maak hiervoor geen nieuwe spelregel of state.
- Eindresultaat: gebruik `goat-standing-platform-scene-v01.png` als resultaatillustratie. Dit is een complete scène, geen losse sprite.
- Actieve vraag-/antwoordinterface: toon geen grote geitafbeelding. Geef vraag, timer en invoerveld absolute visuele prioriteit; hooguit een zeer subtiele bestaande omgevingsachtergrond als contrast en leesbaarheid goed blijven.

## Importinstructie

Pak de ZIP uit in de repository-root en voeg de mappen samen met de bestaande `public/` en `docs/` mappen. Overschrijf geen bestaande codebestanden. Laat Codex daarna de aanwezige paden controleren en de bestaande gamecomponenten op basis van bovenstaande exacte mapping aanpassen.

## Codex-regels

1. Inspecteer eerst de bestaande componentstructuur en de huidige schermstaten.
2. Verifieer de feitelijke beeldinhoud en dimensies; vertrouw niet alleen op bestandsnamen.
3. Gebruik uitsluitend de hierboven als runtime-asset aangemerkte bestanden in de player-UI.
4. Gebruik geen master sheets of samengestelde contact sheets in de game.
5. Verzin geen ontbrekende assets en maak geen CSS-vervangingen voor artwork.
6. Verander geen spelregels, vraagbank, antwoordherkenning, score, timers of routes.
7. Test alle relevante schermstaten en rapporteer exact welk asset op welk scherm/state staat.