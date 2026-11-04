export const navigationItems = [
  { label: "Dagelijkse klim", href: "/game", mark: "01" },
  { label: "Unlimited", href: "/unlimited", mark: "∞" },
  { label: "Puffer Party", href: "/party", mark: "02" },
  { label: "Archief", href: "/archive", mark: "03" },
  { label: "Themapakketten", href: "/packs", mark: "04" },
  { label: "Mijn KRILLO", href: "/account", mark: "05" },
  { label: "Vrienden", href: "/friends", mark: "06" },
  { label: "Instellingen", href: "/settings", mark: "07" },
  { label: "Veelgestelde vragen", href: "/faq", mark: "?" }
];

export const placeholderPages: Record<string, { title: string; intro: string }> = {
  unlimited: {
    title: "UNLIMITED",
    intro: "Beklim de route op je eigen tempo. Deze spelmodus is nog in ontwikkeling."
  },
  party: {
    title: "PUFFER PARTY",
    intro: "Verzamel je klimteam. Puffer Party komt binnenkort naar KRILLO."
  },
  archive: {
    title: "HET ARCHIEF",
    intro: "Eerdere expedities bewaren we voor een volgende fase."
  },
  packs: {
    title: "THEMAPAKKETTEN",
    intro: "Nieuwe routes worden op dit moment verkend."
  },
  account: {
    title: "MIJN KRILLO",
    intro: "Persoonlijke profielen zijn nog niet beschikbaar."
  },
  friends: {
    title: "VRIENDEN",
    intro: "Samen op pad kan later. Vriendenfuncties zijn nog in ontwikkeling."
  },
  settings: {
    title: "INSTELLINGEN",
    intro: "Instellingen verschijnen zodra de expeditie verder vorm krijgt."
  },
  faq: {
    title: "VEELGESTELDE VRAGEN",
    intro: "De antwoorden worden verzameld terwijl KRILLO vorm krijgt."
  }
};