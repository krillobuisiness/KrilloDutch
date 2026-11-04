export const QUESTION_COUNT = 7;
export const PREVIEW_DURATION_MS = 3_000;
export const ANSWER_DURATION_MS = 25_000;
export const FEEDBACK_DURATION_MS = 3_000;
export const METERS_PER_POINT = 10;
export const MAX_DEPTH_METERS = 7_000;
export const MAX_SCORE = 700;

export const RARITY_POINTS = Object.freeze({
  PLANKTON: 4,
  TOO_CLEVER: 8,
  SCHOOLER: 16,
  RARE: 32,
  DEEP_CUT: 64,
  ONE_IN_A_KRILLION: 100
});

/** @param {unknown} value */
export function normalizeAnswer(value) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("nl-NL");
}

/** @param {any} record */
function isApprovedAnswerRecord(record) {
  return Boolean(
    record &&
      !record.needs_review &&
      typeof record.displayAnswer === "string" &&
      record.displayAnswer.trim() &&
      Object.hasOwn(RARITY_POINTS, record.rarity)
  );
}

/** @param {any} record */
function answerTokens(record) {
  return [
    record.sourceAnswer,
    record.displayAnswer,
    ...(Array.isArray(record.alternativeAnswers) ? record.alternativeAnswers : []),
    ...(Array.isArray(record.aliases) ? record.aliases : [])
  ].filter((value) => typeof value === "string" && normalizeAnswer(value));
}

/** @param {any} question */
export function isPlayableQuestion(question) {
  return Boolean(
    question &&
      !question.needs_review &&
      (typeof question.id === "string" || typeof question.id === "number") &&
      typeof question.category === "string" &&
      question.category.trim() &&
      typeof question.prompt === "string" &&
      question.prompt.trim() &&
      Array.isArray(question.answerRecords) &&
      question.answerRecords.some(isApprovedAnswerRecord)
  );
}

/**
 * Selects distinct, reviewed questions without modifying the source bank.
 * @param {any[]} bank
 * @param {() => number} random
 * @param {number} count
 */
export function selectRoundQuestions(bank, random = Math.random, count = QUESTION_COUNT) {
  if (!Array.isArray(bank) || !Number.isInteger(count) || count < 1) {
    throw new TypeError("Een vragenbank en een positief aantal vragen zijn vereist.");
  }

  const seenIds = new Set();
  const candidates = bank.filter((question) => {
    if (!isPlayableQuestion(question) || seenIds.has(question.id)) return false;
    seenIds.add(question.id);
    return true;
  });

  if (candidates.length < count) {
    throw new RangeError(`Er zijn ${count} goedgekeurde vragen nodig; gevonden: ${candidates.length}.`);
  }

  const selected = candidates.slice();
  for (let index = 0; index < count; index += 1) {
    const sample = random();
    if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
      throw new RangeError("De random-functie moet een getal tussen 0 en 1 opleveren.");
    }
    const swapIndex = index + Math.floor(sample * (selected.length - index));
    [selected[index], selected[swapIndex]] = [selected[swapIndex], selected[index]];
  }

  return selected.slice(0, count);
}

/** @param {any} question @param {unknown} input */
export function findAcceptedAnswer(question, input) {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput || !Array.isArray(question?.answerRecords)) return null;

  for (const record of question.answerRecords) {
    if (!isApprovedAnswerRecord(record)) continue;
    if (answerTokens(record).some((token) => normalizeAnswer(token) === normalizedInput)) {
      return { answerRecord: record, points: RARITY_POINTS[record.rarity] };
    }
  }

  return null;
}

/** @param {string} rarity */
export function scoreForRarity(rarity) {
  return Object.hasOwn(RARITY_POINTS, rarity) ? RARITY_POINTS[rarity] : 0;
}

/** @param {number} score */
export function depthForScore(score) {
  if (!Number.isFinite(score)) return 0;
  return Math.min(MAX_DEPTH_METERS, Math.max(0, score * METERS_PER_POINT));
}

export function createInitialGameState() {
  return {
    phase: "intro",
    questions: [],
    currentIndex: 0,
    phaseStartedAt: null,
    score: 0,
    correctCount: 0,
    unansweredCount: 0,
    attempts: [],
    results: [],
    feedback: null,
    currentResult: null
  };
}

/** @param {ReturnType<typeof createInitialGameState>} state @param {any[]} questions @param {number} now */
export function startRound(state, questions, now) {
  if (state.phase !== "intro" && state.phase !== "result") return state;
  if (!Array.isArray(questions) || questions.length !== QUESTION_COUNT) {
    throw new RangeError(`Een ronde moet precies ${QUESTION_COUNT} vragen bevatten.`);
  }
  if (questions.some((question) => !isPlayableQuestion(question)) || new Set(questions.map((question) => question.id)).size !== QUESTION_COUNT) {
    throw new TypeError("Een ronde bevat een ongeldige of dubbele vraag.");
  }
  if (!Number.isFinite(now)) throw new TypeError("Een geldige starttijd is vereist.");

  return {
    ...createInitialGameState(),
    phase: "preview",
    questions: questions.slice(),
    phaseStartedAt: now
  };
}

/** @param {ReturnType<typeof createInitialGameState>} state @param {number} now */
export function remainingTimeMs(state, now) {
  if (state.phase === "preview") {
    return Math.max(0, PREVIEW_DURATION_MS - (now - state.phaseStartedAt));
  }
  if (state.phase === "answering") {
    return Math.max(0, ANSWER_DURATION_MS - (now - state.phaseStartedAt));
  }
  if (state.phase === "feedback") {
    return Math.max(0, FEEDBACK_DURATION_MS - (now - state.phaseStartedAt));
  }
  return 0;
}

/** @param {ReturnType<typeof createInitialGameState>} state @param {number} now */
function timeOutQuestion(state, now) {
  const question = state.questions[state.currentIndex];
  const referenceAnswer = question.answerRecords.find(isApprovedAnswerRecord)?.displayAnswer ?? "Geen antwoord beschikbaar";
  const currentResult = {
    questionId: question.id,
    question,
    playerAnswers: state.attempts.slice(),
    acceptedAnswer: referenceAnswer,
    rarity: null,
    points: 0,
    timedOut: true
  };

  return {
    ...state,
    phase: "feedback",
    phaseStartedAt: now,
    unansweredCount: state.unansweredCount + 1,
    attempts: state.attempts.slice(),
    results: [...state.results, currentResult],
    feedback: { kind: "timeout", text: `Tijd om. Een mogelijk goed antwoord is: ${referenceAnswer}.` },
    currentResult
  };
}

/** @param {ReturnType<typeof createInitialGameState>} state @param {number} now */
export function advanceGame(state, now) {
  if (!Number.isFinite(now) || state.phaseStartedAt === null) return state;

  if (state.phase === "preview") {
    const answerStartedAt = state.phaseStartedAt + PREVIEW_DURATION_MS;
    if (now < answerStartedAt) return state;
    const answeringState = { ...state, phase: "answering", phaseStartedAt: answerStartedAt, feedback: null };
    if (now >= answerStartedAt + ANSWER_DURATION_MS) {
      return timeOutQuestion(answeringState, answerStartedAt + ANSWER_DURATION_MS);
    }
    return answeringState;
  }

  if (state.phase === "answering") {
    if (now >= state.phaseStartedAt + ANSWER_DURATION_MS) {
      return timeOutQuestion(state, state.phaseStartedAt + ANSWER_DURATION_MS);
    }
    return state;
  }

  if (state.phase === "feedback" && now >= state.phaseStartedAt + FEEDBACK_DURATION_MS) {
    if (state.results.length === QUESTION_COUNT) {
      return { ...state, phase: "result", phaseStartedAt: null, feedback: null };
    }
    return {
      ...state,
      phase: "preview",
      currentIndex: state.currentIndex + 1,
      phaseStartedAt: now,
      attempts: [],
      feedback: null,
      currentResult: null
    };
  }

  return state;
}

/** @param {ReturnType<typeof createInitialGameState>} state @param {string} value @param {number} now */
export function submitAnswer(state, value, now) {
  const currentState = advanceGame(state, now);
  if (currentState.phase !== "answering") return currentState;

  const answer = typeof value === "string" ? value.trim() : "";
  if (!answer) {
    return { ...currentState, feedback: { kind: "empty", text: "Vul eerst een antwoord in." } };
  }

  const question = currentState.questions[currentState.currentIndex];
  const match = findAcceptedAnswer(question, answer);
  const playerAnswers = [...currentState.attempts, answer];
  if (!match) {
    return {
      ...currentState,
      attempts: playerAnswers,
      feedback: { kind: "incorrect", text: "Dat antwoord wordt niet herkend. Probeer het opnieuw zolang de tijd loopt." }
    };
  }

  const currentResult = {
    questionId: question.id,
    question,
    playerAnswers,
    acceptedAnswer: match.answerRecord.displayAnswer,
    rarity: match.answerRecord.rarity,
    points: match.points,
    timedOut: false
  };

  return {
    ...currentState,
    phase: "feedback",
    phaseStartedAt: now,
    score: currentState.score + match.points,
    correctCount: currentState.correctCount + 1,
    attempts: playerAnswers,
    results: [...currentState.results, currentResult],
    currentResult,
    feedback: { kind: "correct", text: "Goed antwoord." }
  };
}

/** @param {ReturnType<typeof createInitialGameState>} state @param {{ type: string, questions?: any[], answer?: string, now: number }} action */
export function gameReducer(state, action) {
  switch (action.type) {
    case "START":
      return startRound(state, action.questions, action.now);
    case "SUBMIT":
      return submitAnswer(state, action.answer, action.now);
    case "TICK":
      return advanceGame(state, action.now);
    default:
      return state;
  }
}