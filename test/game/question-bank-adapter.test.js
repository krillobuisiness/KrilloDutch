import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  DEV_TEST_BANK_PATH,
  OFFICIAL_BANK_PATH,
  OFFICIAL_CATEGORY_LABELS,
  OFFICIAL_RARITY_POINTS,
  REQUIRED_CATEGORY_COUNTS,
  adaptOfficialQuestionBank,
  getQuestionBankCandidates,
  normalizeOfficialRarityTier,
  parseOfficialQuestionBank,
  validateOfficialQuestionBank
} from "../../lib/game/data/question-bank-adapter.ts";

const sampleBank = {
  schemaVersion: "1.0.0",
  locale: "nl",
  categories: Object.entries(REQUIRED_CATEGORY_COUNTS).map(([id, count], categoryIndex) => ({
    id,
    question: `Vraag ${categoryIndex + 1}`,
    answers: Array.from({ length: count }, (_, index) => ({
      id: `${id}-${index + 1}`,
      sourceAnswer: `${id}-antwoord-${index + 1}`,
      displayAnswer: `${id}-antwoord-${index + 1}`,
      acceptedAliases: index % 2 === 0 ? ["alias-1"] : [],
      rarityTierId: ["PLANKTON", "TOO CLEVER", "SCHOOLER", "RARE", "DEEP CUT", "ONE IN A KRILLION"][index % 6],
      points: [4, 8, 16, 32, 64, 100][index % 6],
      status: "active"
    }))
  }))
};

test("the official rarity mapping preserves the required engine identifiers", () => {
  assert.equal(normalizeOfficialRarityTier("TOO CLEVER"), "TOO_CLEVER");
  assert.equal(normalizeOfficialRarityTier("DEEP CUT"), "DEEP_CUT");
  assert.equal(normalizeOfficialRarityTier("ONE IN A KRILLION"), "ONE_IN_A_KRILLION");
  assert.deepEqual(OFFICIAL_RARITY_POINTS, {
    PLANKTON: 4,
    TOO_CLEVER: 8,
    SCHOOLER: 16,
    RARE: 32,
    DEEP_CUT: 64,
    ONE_IN_A_KRILLION: 100
  });
});

test("the category labels and required counts are enforced for a valid official bank", () => {
  validateOfficialQuestionBank(sampleBank);
  assert.equal(OFFICIAL_CATEGORY_LABELS.comic_book_films, "Stripfilms");
  assert.equal(REQUIRED_CATEGORY_COUNTS.world_leaders, 60);
  assert.deepEqual(sampleBank.categories.map((category) => category.id).sort(), Object.keys(REQUIRED_CATEGORY_COUNTS).sort());
});

test("the adapter maps source data to the game's question shape while preserving metadata", () => {
  const adapted = adaptOfficialQuestionBank(sampleBank);
  const question = adapted[0];

  assert.equal(question.category, "Stripfilms");
  assert.equal(question.answerRecords[0].displayAnswer, "comic_book_films-antwoord-1");
  assert.deepEqual(question.answerRecords[0].aliases, ["alias-1"]);
  assert.equal(question.answerRecords[0].rarity, "PLANKTON");
  assert.equal(question.answerRecords[0].needs_review, false);
  assert.equal(question.answerRecords[0].sourceAnswer, "comic_book_films-antwoord-1");
});

test("json parsing validates the official schema before accepting it", () => {
  const parsed = parseOfficialQuestionBank(JSON.stringify(sampleBank));
  assert.equal(parsed.categories.length, 7);
  assert.throws(() => validateOfficialQuestionBank({ categories: [] }), /7 categorie/);
});

test("development mode can load the test dataset while production excludes it", () => {
  const developmentCandidates = getQuestionBankCandidates("development");
  const productionCandidates = getQuestionBankCandidates("production");

  assert.ok(developmentCandidates.includes(DEV_TEST_BANK_PATH));
  assert.ok(!productionCandidates.includes(DEV_TEST_BANK_PATH));
  assert.deepEqual(productionCandidates, [OFFICIAL_BANK_PATH]);
});

test("the actual bundled word list also validates and adapts into the engine format", () => {
  const source = readFileSync(new URL("../../lib/game/data/krillo-testwoordenlijst-nl.json", import.meta.url), "utf8");
  const parsed = parseOfficialQuestionBank(source);

  assert.equal(parsed.categories.length, 7);
  const adapted = adaptOfficialQuestionBank(parsed);
  assert.equal(adapted.length, 7);
  assert.ok(adapted.every((question) => Array.isArray(question.answerRecords) && question.answerRecords.length > 0));
  assert.equal(adapted[0].category, "Keukenkruiden");
});
