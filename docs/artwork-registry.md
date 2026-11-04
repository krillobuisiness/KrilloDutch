# KRILLO artwork registry

This registry tracks the official runtime artwork and the internal reference-only files that must stay out of the player-facing UI.

| Asset key | Filename | Actual path | Dimensions | Intended use | Screen/state placement | Composition | Player-facing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| homepageHero | the-infinite-hero-v01.png | /assets/krillo/environments/the-infinite-hero-v01.png | 1672×941 | Homepage hero environment | Homepage / | Complete wide environment with distant gateway and small goat already in the scene | Yes |
| gatewaySun | gateway-sun-v01.png | /assets/krillo/environments/gateway-sun-v01.png | 1536×1024 | Main game intro environment | /game intro and active question states | Monumental gateway scene without goat | Yes |
| goatWalkingRuins | goat-walking-ruins-scene-v01.png | /assets/krillo/environments/goat-walking-ruins-scene-v01.png | 1774×887 | Correct-answer feedback | Existing feedback illustration panel | Complete walking goat scene in a golden ruin landscape | Yes |
| goatClimbingStairs | goat-climbing-stairs-scene-v01.png | /assets/krillo/environments/goat-climbing-stairs-scene-v01.png | 1536×1024 | High-rarity feedback | Existing feedback illustration panel for DEEP CUT and ONE IN A KRILLION | Complete climbing goat scene on ancient stairs | Yes |
| goatStandingPlatform | goat-standing-platform-scene-v01.png | /assets/krillo/environments/goat-standing-platform-scene-v01.png | 1536×1024 | Final result illustration | Final result screen after question seven | Complete standing goat scene on a platform | Yes |
| goatMasterSheet | goat-master-sheet-v01.png | /docs/artwork-references/goat-master-sheet-v01.png | 1774×887 | Internal character reference | docs/artwork-references only | Full master sheet and group detail | No |
| compositionBoard | composition-board-v01.png | /docs/artwork-references/composition-board-v01.png | 1672×941 | Internal concept board | docs/artwork-references only | Multi-panel concept composition | No |
| characterVariants | goat-walking-variant-01-checkerboard-baked.png | /docs/artwork-references/character-variants/goat-walking-variant-01-checkerboard-baked.png | 1536×1024 | Internal pose study | docs/artwork-references/character-variants only | Checkerboard baked background; not a transparent sprite | No |
| characterVariants | goat-walking-variant-02-white-background.png | /docs/artwork-references/character-variants/goat-walking-variant-02-white-background.png | 1774×887 | Internal pose study | docs/artwork-references/character-variants only | White-background study; not a transparent sprite | No |
| characterVariants | goat-walking-variant-03-checkerboard-baked.png | /docs/artwork-references/character-variants/goat-walking-variant-03-checkerboard-baked.png | 1536×1024 | Internal pose study | docs/artwork-references/character-variants only | Checkerboard baked background; not a transparent sprite | No |
| characterVariants | goat-climbing-variant-01-checkerboard-baked.png | /docs/artwork-references/character-variants/goat-climbing-variant-01-checkerboard-baked.png | 1774×887 | Internal pose study | docs/artwork-references/character-variants only | Checkerboard baked background; not a transparent sprite | No |
| characterVariants | goat-walking-variant-04-checkerboard-baked.png | /docs/artwork-references/character-variants/goat-walking-variant-04-checkerboard-baked.png | 1536×1024 | Internal pose study | docs/artwork-references/character-variants only | Checkerboard baked background; not a transparent sprite | No |

## Rules

- Only the five player-facing environment/scene assets should be used in the live app.
- Internal reference sheets and variants must stay in /docs/artwork-references and never be rendered to users.
- No new artwork should be generated or replaced; the existing official pack is the source of truth.
