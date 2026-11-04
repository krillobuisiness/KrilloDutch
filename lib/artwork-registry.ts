export const KRILLO_ARTWORK = {
  homepageHero: {
    filename: "the-infinite-hero-v01.png",
    path: "/assets/krillo/environments/the-infinite-hero-v01.png",
    dimensions: "1672×941",
    role: "ENVIRONMENT",
    intendedUse: "Homepage hero and game-world introduction frame.",
    placement: "Homepage / and the first screen introduction.",
    composition: "Complete wide environment with distant circular gateway and a small goat already in the scene.",
    playerFacing: true,
    alt: "The Infinite hero environment with a distant circular gate and a small goat in the foreground."
  },
  gatewaySun: {
    filename: "gateway-sun-v01.png",
    path: "/assets/krillo/environments/gateway-sun-v01.png",
    dimensions: "1536×1024",
    role: "ENVIRONMENT",
    intendedUse: "Main environmental composition for the game intro and active question states.",
    placement: "/game intro and active question view.",
    composition: "Monumental gateway with the sunlit horizon and a long sequence of portals.",
    playerFacing: true,
    alt: "A monumental stone gateway leading toward the sun."
  },
  goatWalkingRuins: {
    filename: "goat-walking-ruins-scene-v01.png",
    path: "/assets/krillo/environments/goat-walking-ruins-scene-v01.png",
    dimensions: "1774×887",
    role: "SCENE",
    intendedUse: "Ordinary correct-answer feedback illustration.",
    placement: "Existing feedback illustration panel for successful answers.",
    composition: "Complete walking goat scene in a golden ruin landscape.",
    playerFacing: true,
    alt: "A goat walking through a golden ruin landscape."
  },
  goatClimbingStairs: {
    filename: "goat-climbing-stairs-scene-v01.png",
    path: "/assets/krillo/environments/goat-climbing-stairs-scene-v01.png",
    dimensions: "1536×1024",
    role: "SCENE",
    intendedUse: "Rare-discovery feedback illustration for DEEP CUT and ONE IN A KRILLION.",
    placement: "The same feedback illustration panel, only in high-rarity result states.",
    composition: "Complete climbing goat scene on ancient celestial stairs.",
    playerFacing: true,
    alt: "A goat climbing ancient celestial stairs."
  },
  goatStandingPlatform: {
    filename: "goat-standing-platform-scene-v01.png",
    path: "/assets/krillo/environments/goat-standing-platform-scene-v01.png",
    dimensions: "1536×1024",
    role: "SCENE",
    intendedUse: "Final expedition completion illustration.",
    placement: "Final results screen after question seven.",
    composition: "Complete standing goat scene on a stone platform in a golden archipelago.",
    playerFacing: true,
    alt: "A goat standing on a stone platform in a golden archipelago."
  },
  goatMasterSheet: {
    filename: "goat-master-sheet-v01.png",
    path: "/docs/artwork-references/goat-master-sheet-v01.png",
    dimensions: "1774×887",
    role: "REFERENCE_ONLY",
    intendedUse: "Internal character turnaround and proportion reference.",
    placement: "Never player-facing; kept in docs/artwork-references.",
    composition: "Detailed master sheet with horn, fur, and body proportions.",
    playerFacing: false,
    alt: "Internal goat master-sheet reference."
  },
  compositionBoard: {
    filename: "composition-board-v01.png",
    path: "/docs/artwork-references/composition-board-v01.png",
    dimensions: "1672×941",
    role: "REFERENCE_ONLY",
    intendedUse: "Composite concept board for composition planning only.",
    placement: "Internal concept reference only; never shown to players.",
    composition: "Multi-panel environment concept reference board.",
    playerFacing: false,
    alt: "Internal composition concept board."
  },
  characterVariants: [
    {
      filename: "goat-climbing-variant-01-checkerboard-baked.png",
      path: "/docs/artwork-references/character-variants/goat-climbing-variant-01-checkerboard-baked.png",
      dimensions: "1774×887",
      role: "REFERENCE_ONLY",
      intendedUse: "Internal climbing pose study only.",
      playerFacing: false
    },
    {
      filename: "goat-walking-variant-01-checkerboard-baked.png",
      path: "/docs/artwork-references/character-variants/goat-walking-variant-01-checkerboard-baked.png",
      dimensions: "1536×1024",
      role: "REFERENCE_ONLY",
      intendedUse: "Internal walking pose study only.",
      playerFacing: false
    },
    {
      filename: "goat-walking-variant-02-white-background.png",
      path: "/docs/artwork-references/character-variants/goat-walking-variant-02-white-background.png",
      dimensions: "1774×887",
      role: "REFERENCE_ONLY",
      intendedUse: "Internal walking pose study only.",
      playerFacing: false
    },
    {
      filename: "goat-walking-variant-03-checkerboard-baked.png",
      path: "/docs/artwork-references/character-variants/goat-walking-variant-03-checkerboard-baked.png",
      dimensions: "1536×1024",
      role: "REFERENCE_ONLY",
      intendedUse: "Internal walking pose study only.",
      playerFacing: false
    },
    {
      filename: "goat-walking-variant-04-checkerboard-baked.png",
      path: "/docs/artwork-references/character-variants/goat-walking-variant-04-checkerboard-baked.png",
      dimensions: "1536×1024",
      role: "REFERENCE_ONLY",
      intendedUse: "Internal walking pose study only.",
      playerFacing: false
    }
  ]
} as const;

export type ArtworkKind = keyof typeof KRILLO_ARTWORK;
