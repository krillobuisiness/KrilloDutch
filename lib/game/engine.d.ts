export type Rarity =
  | "PLANKTON"
  | "TOO_CLEVER"
  | "SCHOOLER"
  | "RARE"
  | "DEEP_CUT"
  | "ONE_IN_A_KRILLION";

export interface AnswerRecord {
  sourceAnswer: string;
  displayAnswer: string;
  aliases?: string[];
  alternativeAnswers?: string[];
  rarity: Rarity;
  needs_review?: boolean;
}

export interface GameQuestion {
  id: string | number;
  category: string;
  prompt: string;
  answerRecords: AnswerRecord[];
  needs_review?: boolean;
}

export interface QuestionResult {
  questionId: GameQuestion["id"];
  question: GameQuestion;
  playerAnswers: string[];
  acceptedAnswer: string;
  rarity: Rarity | null;
  points: number;
  timedOut: boolean;
}

export interface GameState {
  phase: "intro" | "preview" | "answering" | "feedback" | "result";
  questions: GameQuestion[];
  currentIndex: number;
  phaseStartedAt: number | null;
  score: number;
  correctCount: number;
  unansweredCount: number;
  attempts: string[];
  results: QuestionResult[];
  feedback: { kind: "empty" | "incorrect" | "timeout" | "correct"; text: string } | null;
  currentResult: QuestionResult | null;
}

export type GameAction =
  | { type: "START"; questions: GameQuestion[]; now: number }
  | { type: "SUBMIT"; answer: string; now: number }
  | { type: "TICK"; now: number };

export const QUESTION_COUNT: 7;
export const PREVIEW_DURATION_MS: 3000;
export const ANSWER_DURATION_MS: 25000;
export const FEEDBACK_DURATION_MS: 3000;
export const METERS_PER_POINT: 10;
export const MAX_DEPTH_METERS: 7000;
export const MAX_SCORE: 700;
export const RARITY_POINTS: Readonly<Record<Rarity, number>>;

export function normalizeAnswer(value: unknown): string;
export function isPlayableQuestion(question: unknown): question is GameQuestion;
export function selectRoundQuestions(bank: GameQuestion[], random?: () => number, count?: number): GameQuestion[];
export function findAcceptedAnswer(question: GameQuestion, input: unknown): { answerRecord: AnswerRecord; points: number } | null;
export function scoreForRarity(rarity: string): number;
export function depthForScore(score: number): number;
export function createInitialGameState(): GameState;
export function startRound(state: GameState, questions: GameQuestion[], now: number): GameState;
export function remainingTimeMs(state: GameState, now: number): number;
export function advanceGame(state: GameState, now: number): GameState;
export function submitAnswer(state: GameState, value: string, now: number): GameState;
export function gameReducer(state: GameState, action: GameAction): GameState;