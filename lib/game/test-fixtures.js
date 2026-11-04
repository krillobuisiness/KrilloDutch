export const DEMO_DATA_NOTICE = "Demovragen: de officiële vraagbank met 393 antwoordrecords is niet aanwezig.";

/** @type {import("./engine.js").GameQuestion[]} */
export const demoQuestions = [
  {
    id: "demo-geography",
    category: "Aardrijkskunde",
    prompt: "Noem een land in Zuid-Amerika.",
    answerRecords: [
      { sourceAnswer: "Brazil", displayAnswer: "Brazilië", aliases: ["Brasil"], alternativeAnswers: [], rarity: "PLANKTON", needs_review: false },
      { sourceAnswer: "Bolivia", displayAnswer: "Bolivia", aliases: [], alternativeAnswers: [], rarity: "SCHOOLER", needs_review: false },
      { sourceAnswer: "Suriname", displayAnswer: "Suriname", aliases: [], alternativeAnswers: [], rarity: "RARE", needs_review: false },
      { sourceAnswer: "Guyana", displayAnswer: "Guyana", aliases: [], alternativeAnswers: [], rarity: "DEEP_CUT", needs_review: false },
      { sourceAnswer: "Paraguay", displayAnswer: "Paraguay", aliases: [], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: false },
      { sourceAnswer: "Atlantium", displayAnswer: "Atlantium", aliases: [], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: true }
    ]
  },
  {
    id: "demo-nature",
    category: "Natuur",
    prompt: "Noem een zoogdier dat eieren legt.",
    answerRecords: [
      { sourceAnswer: "platypus", displayAnswer: "Vogelbekdier", aliases: ["snaveldier"], alternativeAnswers: ["duck-billed platypus"], rarity: "TOO_CLEVER", needs_review: false },
      { sourceAnswer: "echidna", displayAnswer: "Mierenegel", aliases: ["stekelvarken"], alternativeAnswers: ["spiny anteater"], rarity: "DEEP_CUT", needs_review: false },
      { sourceAnswer: "short-beaked echidna", displayAnswer: "Kortbekmierenegel", aliases: ["Tachyglossus aculeatus"], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: false }
    ]
  },
  {
    id: "demo-space",
    category: "Ruimte",
    prompt: "Noem een maan van Jupiter.",
    answerRecords: [
      { sourceAnswer: "Io", displayAnswer: "Io", aliases: [], alternativeAnswers: [], rarity: "PLANKTON", needs_review: false },
      { sourceAnswer: "Europa", displayAnswer: "Europa", aliases: [], alternativeAnswers: [], rarity: "SCHOOLER", needs_review: false },
      { sourceAnswer: "Ganymede", displayAnswer: "Ganymedes", aliases: ["Ganymede"], alternativeAnswers: [], rarity: "RARE", needs_review: false },
      { sourceAnswer: "Callisto", displayAnswer: "Callisto", aliases: [], alternativeAnswers: [], rarity: "DEEP_CUT", needs_review: false },
      { sourceAnswer: "Metis", displayAnswer: "Metis", aliases: [], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: false }
    ]
  },
  {
    id: "demo-science",
    category: "Wetenschap",
    prompt: "Noem een edelgas.",
    answerRecords: [
      { sourceAnswer: "helium", displayAnswer: "Helium", aliases: [], alternativeAnswers: [], rarity: "PLANKTON", needs_review: false },
      { sourceAnswer: "neon", displayAnswer: "Neon", aliases: [], alternativeAnswers: [], rarity: "TOO_CLEVER", needs_review: false },
      { sourceAnswer: "argon", displayAnswer: "Argon", aliases: [], alternativeAnswers: [], rarity: "SCHOOLER", needs_review: false },
      { sourceAnswer: "xenon", displayAnswer: "Xenon", aliases: [], alternativeAnswers: [], rarity: "RARE", needs_review: false },
      { sourceAnswer: "oganesson", displayAnswer: "Oganesson", aliases: [], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: false }
    ]
  },
  {
    id: "demo-history",
    category: "Geschiedenis",
    prompt: "Noem een stad die ooit hoofdstad van een rijk was.",
    answerRecords: [
      { sourceAnswer: "Rome", displayAnswer: "Rome", aliases: [], alternativeAnswers: [], rarity: "PLANKTON", needs_review: false },
      { sourceAnswer: "Cusco", displayAnswer: "Cusco", aliases: ["Cuzco"], alternativeAnswers: [], rarity: "RARE", needs_review: false },
      { sourceAnswer: "Tenochtitlan", displayAnswer: "Tenochtitlan", aliases: ["Tenochtitlán"], alternativeAnswers: [], rarity: "DEEP_CUT", needs_review: false },
      { sourceAnswer: "Aksum", displayAnswer: "Aksum", aliases: ["Axum"], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: false }
    ]
  },
  {
    id: "demo-culture",
    category: "Cultuur",
    prompt: "Noem een instrument uit de strijkersfamilie.",
    answerRecords: [
      { sourceAnswer: "violin", displayAnswer: "Viool", aliases: [], alternativeAnswers: [], rarity: "PLANKTON", needs_review: false },
      { sourceAnswer: "viola", displayAnswer: "Altviool", aliases: [], alternativeAnswers: ["viool-alt"], rarity: "TOO_CLEVER", needs_review: false },
      { sourceAnswer: "violoncello", displayAnswer: "Cello", aliases: ["violoncello"], alternativeAnswers: [], rarity: "SCHOOLER", needs_review: false },
      { sourceAnswer: "contrabass", displayAnswer: "Contrabas", aliases: ["double bass"], alternativeAnswers: [], rarity: "RARE", needs_review: false },
      { sourceAnswer: "nyckelharpa", displayAnswer: "Nyckelharpa", aliases: ["sleutelharp"], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: false }
    ]
  },
  {
    id: "demo-botany",
    category: "Plantkunde",
    prompt: "Noem een plant die insecten vangt.",
    answerRecords: [
      { sourceAnswer: "Venus flytrap", displayAnswer: "Venusvliegenvanger", aliases: ["venusvliegenval"], alternativeAnswers: ["Dionaea muscipula"], rarity: "SCHOOLER", needs_review: false },
      { sourceAnswer: "pitcher plant", displayAnswer: "Bekerplant", aliases: [], alternativeAnswers: ["Nepenthes"], rarity: "DEEP_CUT", needs_review: false },
      { sourceAnswer: "sundew", displayAnswer: "Zonnedauw", aliases: [], alternativeAnswers: ["Drosera"], rarity: "DEEP_CUT", needs_review: false },
      { sourceAnswer: "Aldrovanda vesiculosa", displayAnswer: "Waterradplant", aliases: ["waterradplant"], alternativeAnswers: [], rarity: "ONE_IN_A_KRILLION", needs_review: false }
    ]
  }
];