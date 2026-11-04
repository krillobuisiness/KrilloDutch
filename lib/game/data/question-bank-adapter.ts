import type { AnswerRecord, GameQuestion, Rarity } from "../engine.js";

export const OFFICIAL_BANK_PATH = "lib/game/data/krillo-vragenbank-nl.json";
export const DEV_TEST_BANK_PATH = "lib/game/data/krillo-testwoordenlijst-nl.json";

export const OFFICIAL_CATEGORY_LABELS = Object.freeze({
  comic_book_films: "Stripfilms",
  winter_sports: "Wintersporten",
  zoos_and_aquariums: "Dierentuinen & aquaria",
  writing_tools: "Schrijfgerei",
  world_leaders: "Wereldleiders",
  muscles: "Spieren",
  asian_water_bodies: "Wateren van Azië",
  kitchen_herbs: "Keukenkruiden",
  acronyms: "Afkortingen",
  turtles: "Schildpadden",
  megacities: "Megasteden",
  bays_gulfs: "Baaien & golven",
  things_that_shrink: "Dingen die krimpen",
  mario_enemies: "Mario-vijanden"
} as const);

export const OFFICIAL_RARITY_TIER_MAP = Object.freeze({
  "PLANKTON": "PLANKTON",
  "TOO CLEVER": "TOO_CLEVER",
  "SCHOOLER": "SCHOOLER",
  "RARE": "RARE",
  "DEEP CUT": "DEEP_CUT",
  "ONE IN A KRILLION": "ONE_IN_A_KRILLION"
} as const);

export const OFFICIAL_RARITY_POINTS = Object.freeze({
  PLANKTON: 4,
  TOO_CLEVER: 8,
  SCHOOLER: 16,
  RARE: 32,
  DEEP_CUT: 64,
  ONE_IN_A_KRILLION: 100
} as const);

export const REQUIRED_CATEGORY_COUNTS = Object.freeze({
  comic_book_films: 55,
  winter_sports: 55,
  zoos_and_aquariums: 57,
  writing_tools: 55,
  world_leaders: 60,
  muscles: 60,
  asian_water_bodies: 51
} as const);

export type OfficialQuestionBank = {
  schemaVersion?: string;
  locale?: string;
  sourceFile?: string;
  description?: string;
  rarityTiers?: Array<{ id: string; label?: string; nlLabel?: string }>;
  categories: OfficialCategory[];
  editorialNotes?: unknown;
};

export type OfficialCategory = {
  id: string;
  sourceQuestion?: string;
  question: string;
  answers: OfficialAnswerRecord[];
};

export type OfficialAnswerRecord = {
  id: string | number;
  sourceAnswer: string;
  displayAnswer: string;
  acceptedAliases?: string[];
  rarityTierId: string;
  points: number;
  status?: string;
  editorialReview?: string | null;
  reviewNote?: string | null;
};

export function getQuestionBankCandidates(mode = process.env.NODE_ENV ?? "development") {
  const candidates = [OFFICIAL_BANK_PATH];
  if (mode !== "production") {
    candidates.push(DEV_TEST_BANK_PATH);
  }
  return candidates;
}

export function getOfficialBankMissingMessage(mode = process.env.NODE_ENV ?? "development"): string {
  if (mode === "production") {
    return `Ontbrekende officiële productie-vraagbank: ${OFFICIAL_BANK_PATH}. Geen demo- of testdataset mag als productie-vervanging worden gebruikt.`;
  }

  return `Ontbrekende ontwikkel-vraagbank: ${OFFICIAL_BANK_PATH}. De testdataset ${DEV_TEST_BANK_PATH} is alleen beschikbaar in ontwikkel- en testmodi.`;
}

export function normalizeOfficialRarityTier(rarityTierId: unknown): Rarity {
  const tierId = typeof rarityTierId === "string" ? rarityTierId : "";
  const normalizedTier = OFFICIAL_RARITY_TIER_MAP[tierId as keyof typeof OFFICIAL_RARITY_TIER_MAP];

  if (!normalizedTier) {
    throw new TypeError(`Ongeldige rariteit in de officiële vraagbank: ${String(rarityTierId)}`);
  }

  return normalizedTier as Rarity;
}

export function validateOfficialQuestionBank(rawBank: unknown): asserts rawBank is OfficialQuestionBank {
  if (!rawBank || typeof rawBank !== "object") {
    throw new TypeError("De officiële vraagbank moet een object zijn.");
  }

  const bank = rawBank as Partial<OfficialQuestionBank>;
  if (!Array.isArray(bank.categories)) {
    throw new TypeError("De officiële vraagbank mist een geldige categories-array.");
  }

  if (bank.categories.length !== 7) {
    throw new RangeError(`De officiële vraagbank moet precies 7 categorieën bevatten; gevonden: ${bank.categories.length}.`);
  }

  const seenCategoryIds = new Set<string>();
  for (const category of bank.categories) {
    if (!category || typeof category !== "object") {
      throw new TypeError("Een categorie in de officiële vraagbank is ongeldig.");
    }

    if (typeof category.id !== "string" || !category.id.trim()) {
      throw new TypeError("Een categorie mist een geldige id.");
    }

    if (seenCategoryIds.has(category.id)) {
      throw new RangeError(`Categorie ${category.id} komt meerdere keren voor in de officiële vraagbank.`);
    }
    seenCategoryIds.add(category.id);

    const expectedCount = REQUIRED_CATEGORY_COUNTS[category.id as keyof typeof REQUIRED_CATEGORY_COUNTS];
    if (typeof expectedCount === "number" && category.answers.length !== expectedCount) {
      throw new RangeError(`Categorie ${category.id} verwacht ${expectedCount} antwoorden; gevonden: ${category.answers.length}.`);
    }

    if (!Array.isArray(category.answers) || category.answers.length === 0) {
      throw new RangeError(`Categorie ${category.id} bevat geen antwoorden.`);
    }

    if (!Array.isArray(category.answers)) {
      throw new TypeError(`Categorie ${category.id} mist een geldige answers-array.`);
    }

    for (const answer of category.answers) {
      if (!answer || typeof answer !== "object") {
        throw new TypeError(`Categorie ${category.id} bevat een ongeldige antwoordrecord.`);
      }

      const rarity = normalizeOfficialRarityTier(answer.rarityTierId);
      const expectedPoints = OFFICIAL_RARITY_POINTS[rarity];
      if (Number(answer.points) !== expectedPoints) {
        throw new RangeError(
          `Antwoord ${answer.id ?? "onbekend"} in categorie ${category.id} heeft punten ${answer.points}, verwacht ${expectedPoints} voor ${rarity}.`
        );
      }

      if (typeof answer.displayAnswer !== "string" || !answer.displayAnswer.trim()) {
        throw new TypeError(`Antwoord ${answer.id ?? "onbekend"} in categorie ${category.id} mist een geldige displayAnswer.`);
      }
    }
  }

  const officialIds = Object.keys(REQUIRED_CATEGORY_COUNTS);
  const actualIds = [...seenCategoryIds];
  const officialCount = new Set(officialIds);
  const matchesOfficialSchema = officialIds.length === actualIds.length && officialIds.every((id) => actualIds.includes(id));

  if (!matchesOfficialSchema) {
    const stillValid = actualIds.length === 7 && actualIds.every((id) => typeof id === "string" && id.trim().length > 0);
    if (!stillValid) {
      throw new RangeError(`Onverwachte categorie-id's gevonden: ${actualIds.join(", ")}.`);
    }
  }
}

export function adaptOfficialQuestionBank(rawBank: unknown): GameQuestion[] {
  validateOfficialQuestionBank(rawBank);

  const bank = rawBank as OfficialQuestionBank;

  return bank.categories.map((category) => ({
    id: category.id,
    category: OFFICIAL_CATEGORY_LABELS[category.id as keyof typeof OFFICIAL_CATEGORY_LABELS] ?? category.id,
    prompt: category.question,
    answerRecords: category.answers.map((answer) => {
      const rarity = normalizeOfficialRarityTier(answer.rarityTierId);
      const adapted: AnswerRecord & {
        sourceId?: string | number;
        status?: string;
        editorialReview?: string | null;
        reviewNote?: string | null;
        points?: number;
      } = {
        sourceAnswer: answer.sourceAnswer,
        displayAnswer: answer.displayAnswer,
        aliases: Array.isArray(answer.acceptedAliases) ? answer.acceptedAliases : [],
        alternativeAnswers: [],
        rarity,
        needs_review: false,
        sourceId: answer.id,
        status: answer.status,
        editorialReview: answer.editorialReview ?? null,
        reviewNote: answer.reviewNote ?? null,
        points: Number(answer.points)
      };

      return adapted;
    })
  }));
}

export function parseOfficialQuestionBank(jsonText: string): OfficialQuestionBank {
  try {
    const parsed = JSON.parse(jsonText) as unknown;
    validateOfficialQuestionBank(parsed);
    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Ongeldige officiële vraagbank: ${error.message}`);
    }
    throw new Error("Ongeldige officiële vraagbank: onbekende parsefout.");
  }
}
