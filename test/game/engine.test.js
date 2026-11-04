import test from "node:test";
import assert from "node:assert/strict";
import {
  ANSWER_DURATION_MS,
  FEEDBACK_DURATION_MS,
  MAX_DEPTH_METERS,
  MAX_SCORE,
  PREVIEW_DURATION_MS,
  QUESTION_COUNT,
  RARITY_POINTS,
  advanceGame,
  createInitialGameState,
  depthForScore,
  findAcceptedAnswer,
  remainingTimeMs,
  selectRoundQuestions,
  startRound,
  submitAnswer
} from "../../lib/game/engine.js";
import { demoQuestions } from "../../lib/game/test-fixtures.js";

function fixedRandom() {
  return () => 0;
}

function startDemoRound(now = 0, questions = demoQuestions) {
  return startRound(createInitialGameState(), questions.slice(), now);
}

function beginAnswering(state) {
  return advanceGame(state, state.phaseStartedAt + PREVIEW_DURATION_MS);
}

test("round selection returns seven unique approved questions without mutating the bank", () => {
  const bankBefore = structuredClone(demoQuestions);
  const round = selectRoundQuestions(demoQuestions, fixedRandom());

  assert.equal(round.length, QUESTION_COUNT);
  assert.equal(new Set(round.map((question) => question.id)).size, QUESTION_COUNT);
  assert.deepEqual(demoQuestions, bankBefore);
  assert.equal(round.some((question) => question.answerRecords.some((answer) => answer.displayAnswer === "Atlantium" && !answer.needs_review)), false);
});

test("round selection refuses an undersized bank", () => {
  assert.throws(() => selectRoundQuestions(demoQuestions.slice(0, 6), fixedRandom()), /precies|goedgekeurde/);
});

test("answer matching handles case, whitespace, source spellings and aliases exactly", () => {
  const question = demoQuestions.find((item) => item.id === "demo-geography");
  assert.equal(findAcceptedAnswer(question, "  bRaSiL  ")?.answerRecord.displayAnswer, "Brazilië");
  assert.equal(findAcceptedAnswer(question, "Brazil")?.points, RARITY_POINTS.PLANKTON);
  assert.equal(findAcceptedAnswer(question, "brazill") , null);
  assert.equal(findAcceptedAnswer(question, "Atlantium"), null);
});

test("approved alternative spellings and aliases match without fuzzy matching", () => {
  const question = demoQuestions.find((item) => item.id === "demo-nature");
  assert.equal(findAcceptedAnswer(question, " DUCK-BILLED   PLATYPUS ")?.answerRecord.displayAnswer, "Vogelbekdier");
  assert.equal(findAcceptedAnswer(question, "platypuss"), null);
});

test("rarity values and depth conversion use the established point table", () => {
  assert.deepEqual(RARITY_POINTS, {
    PLANKTON: 4,
    TOO_CLEVER: 8,
    SCHOOLER: 16,
    RARE: 32,
    DEEP_CUT: 64,
    ONE_IN_A_KRILLION: 100
  });
  assert.equal(depthForScore(MAX_SCORE), MAX_DEPTH_METERS);
  assert.equal(depthForScore(16), 160);
  assert.equal(depthForScore(-4), 0);
});

test("preview lasts three seconds and starts a fresh 25-second answer timer", () => {
  const preview = startDemoRound(1_000);
  assert.equal(advanceGame(preview, 1_000 + PREVIEW_DURATION_MS - 1).phase, "preview");

  const answering = advanceGame(preview, 1_000 + PREVIEW_DURATION_MS);
  assert.equal(answering.phase, "answering");
  assert.equal(answering.phaseStartedAt, 1_000 + PREVIEW_DURATION_MS);
  assert.equal(remainingTimeMs(answering, answering.phaseStartedAt), ANSWER_DURATION_MS);
});

test("an incorrect answer allows another attempt without resetting the timer", () => {
  const answering = beginAnswering(startDemoRound());
  const originalStart = answering.phaseStartedAt;
  const wrong = submitAnswer(answering, "Mars" , originalStart + 5_000);

  assert.equal(wrong.phase, "answering");
  assert.equal(wrong.phaseStartedAt, originalStart);
  assert.deepEqual(wrong.attempts, ["Mars"]);
  assert.equal(remainingTimeMs(wrong, originalStart + 5_000), 20_000);
});

test("a correct answer awards points from the matched record and updates score", () => {
  const questions = demoQuestions.slice();
  const [first] = questions.splice(questions.findIndex((question) => question.id === "demo-geography"), 1);
  questions.unshift(first);
  const answering = beginAnswering(startDemoRound(0, questions));
  const answered = submitAnswer(answering, "Suriname", answering.phaseStartedAt + 500);

  assert.equal(answered.phase, "feedback");
  assert.equal(answered.score, RARITY_POINTS.RARE);
  assert.equal(answered.correctCount, 1);
  assert.equal(answered.currentResult.acceptedAnswer, "Suriname");
  assert.equal(answered.currentResult.points, 32);
  assert.equal(depthForScore(answered.score), 320);
});

test("timeout awards zero, records an unanswered question and reveals a reference answer", () => {
  const answering = beginAnswering(startDemoRound());
  const timedOut = advanceGame(answering, answering.phaseStartedAt + ANSWER_DURATION_MS);

  assert.equal(timedOut.phase, "feedback");
  assert.equal(timedOut.score, 0);
  assert.equal(timedOut.unansweredCount, 1);
  assert.equal(timedOut.currentResult.points, 0);
  assert.equal(timedOut.currentResult.timedOut, true);
  assert.ok(timedOut.feedback.text.includes(timedOut.currentResult.acceptedAnswer));
});

test("feedback advances to a new preview and resets the next question timer", () => {
  const answering = beginAnswering(startDemoRound());
  const completed = submitAnswer(answering, "Brazilië", answering.phaseStartedAt + 100);
  const next = advanceGame(completed, completed.phaseStartedAt + FEEDBACK_DURATION_MS);

  assert.equal(next.phase, "preview");
  assert.equal(next.currentIndex, 1);
  assert.deepEqual(next.attempts, []);
  const nextAnswering = advanceGame(next, next.phaseStartedAt + PREVIEW_DURATION_MS);
  assert.equal(remainingTimeMs(nextAnswering, nextAnswering.phaseStartedAt), ANSWER_DURATION_MS);
});

test("seven completed questions produce a complete result with score and summary", () => {
  let state = startDemoRound();
  let expectedScore = 0;

  for (const question of state.questions) {
    state = beginAnswering(state);
    const answer = question.answerRecords.find((record) => !record.needs_review);
    expectedScore += RARITY_POINTS[answer.rarity];
    state = submitAnswer(state, answer.displayAnswer, state.phaseStartedAt + 250);
    state = advanceGame(state, state.phaseStartedAt + FEEDBACK_DURATION_MS);
  }

  assert.equal(state.phase, "result");
  assert.equal(state.results.length, QUESTION_COUNT);
  assert.equal(state.score, expectedScore);
  assert.equal(state.correctCount, QUESTION_COUNT);
  assert.equal(state.unansweredCount, 0);
  assert.equal(depthForScore(state.score), expectedScore * 10);
  assert.ok(state.results.every((result) => result.question && result.playerAnswers.length === 1 && result.acceptedAnswer && result.points > 0));
});

test("the seven highest-rarity fixture answers reach the 700-point, 7000-metre maximum", () => {
  let state = startDemoRound();
  for (const question of state.questions) {
    state = beginAnswering(state);
    const rarestAnswer = question.answerRecords.find((record) => record.rarity === "ONE_IN_A_KRILLION" && !record.needs_review);
    assert.ok(rarestAnswer, `${question.id} needs an approved maximum-rarity fixture answer`);
    state = submitAnswer(state, rarestAnswer.displayAnswer, state.phaseStartedAt + 100);
    state = advanceGame(state, state.phaseStartedAt + FEEDBACK_DURATION_MS);
  }

  assert.equal(state.score, MAX_SCORE);
  assert.equal(depthForScore(state.score), MAX_DEPTH_METERS);
});

test("a timeout and wrong attempts are retained in the final question summary", () => {
  const answering = beginAnswering(startDemoRound());
  const wrong = submitAnswer(answering, "Not correct", answering.phaseStartedAt + 1_000);
  const timedOut = advanceGame(wrong, wrong.phaseStartedAt + ANSWER_DURATION_MS);

  assert.deepEqual(timedOut.currentResult.playerAnswers, ["Not correct"]);
  assert.equal(timedOut.currentResult.points, 0);
});

test("a repeated submission after a correct answer cannot score twice", () => {
  const answering = beginAnswering(startDemoRound());
  const answered = submitAnswer(answering, "Brazilië", answering.phaseStartedAt + 100);
  const repeated = submitAnswer(answered, "Brazilië", answered.phaseStartedAt + 200);

  assert.equal(repeated.score, answered.score);
  assert.equal(repeated.results.length, 1);
});

test("restarting from the result creates a clean round", () => {
  let result = startDemoRound();
  for (const question of result.questions) {
    result = beginAnswering(result);
    result = submitAnswer(result, question.answerRecords.find((record) => !record.needs_review).displayAnswer, result.phaseStartedAt + 100);
    result = advanceGame(result, result.phaseStartedAt + FEEDBACK_DURATION_MS);
  }

  const restarted = startRound(result, selectRoundQuestions(demoQuestions, fixedRandom()), 90_000);
  assert.equal(restarted.phase, "preview");
  assert.equal(restarted.score, 0);
  assert.equal(restarted.correctCount, 0);
  assert.equal(restarted.unansweredCount, 0);
  assert.deepEqual(restarted.results, []);
  assert.deepEqual(restarted.attempts, []);
});

test("answers submitted after the deadline time out instead of receiving points", () => {
  const answering = beginAnswering(startDemoRound());
  const tooLate = submitAnswer(answering, "Brazilië", answering.phaseStartedAt + ANSWER_DURATION_MS);

  assert.equal(tooLate.phase, "feedback");
  assert.equal(tooLate.score, 0);
  assert.equal(tooLate.currentResult.timedOut, true);
});