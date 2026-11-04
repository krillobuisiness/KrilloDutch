"use client";

import Link from "next/link";
import { useEffect, useReducer, useState, type FormEvent } from "react";
import {
  ClimbingFeedbackArtwork,
  GameIntroArtwork,
  ResultArtwork,
  SceneArtwork,
  WalkingFeedbackArtwork
} from "@/components/GameArtwork";
import {
  ANSWER_DURATION_MS,
  MAX_DEPTH_METERS,
  MAX_SCORE,
  PREVIEW_DURATION_MS,
  QUESTION_COUNT,
  RARITY_POINTS,
  createInitialGameState,
  depthForScore,
  gameReducer,
  remainingTimeMs,
  selectRoundQuestions,
  type Rarity
} from "@/lib/game/engine.js";
import { DEMO_DATA_NOTICE, demoQuestions } from "@/lib/game/test-fixtures.js";

const rarityLabels: Record<Rarity, string> = {
  PLANKTON: "Plankton",
  TOO_CLEVER: "Too Clever",
  SCHOOLER: "Schooler",
  RARE: "Rare",
  DEEP_CUT: "Deep Cut",
  ONE_IN_A_KRILLION: "One in a Krillion"
};

const rarityOrder = Object.keys(RARITY_POINTS) as Rarity[];

export function GameClient() {
  const [game, dispatch] = useReducer(gameReducer, createInitialGameState());
  const [answer, setAnswer] = useState("");
  const [clockNow, setClockNow] = useState(0);
  const [setupError, setSetupError] = useState("");

  useEffect(() => {
    if (!["preview", "answering", "feedback"].includes(game.phase)) return;

    const timerId = window.setInterval(() => {
      const now = performance.now();
      setClockNow(now);
      dispatch({ type: "TICK", now });
    }, 100);

    return () => window.clearInterval(timerId);
  }, [game.phase, game.phaseStartedAt]);

  function beginRound() {
    try {
      const questions = selectRoundQuestions(demoQuestions);
      const now = performance.now();
      setAnswer("");
      setClockNow(now);
      setSetupError("");
      dispatch({ type: "START", questions, now });
    } catch (error) {
      setSetupError(error instanceof Error ? error.message : "De expeditie kon niet starten.");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const now = performance.now();
    setClockNow(now);
    dispatch({ type: "SUBMIT", answer, now });
    setAnswer("");
  }

  const currentQuestion = game.questions[game.currentIndex];
  const secondsRemaining = Math.ceil(remainingTimeMs(game, clockNow) / 1_000);
  const currentDepth = depthForScore(game.score);

  return (
    <main id="main" className="subpage game-session">
      <div className="subpage-kicker"><span className="eyebrow-line" /> DE DAGELIJKSE KLIM <span>EXPEDITIE 001</span></div>
      <p className="demo-data-banner" role="note">DEMO MET TESTVRAGEN <span>·</span> OFFICIËLE VRAGENBANK ONTBREEKT</p>

      {game.phase === "intro" && (
        <div className="game-intro-layout">
          <section className="game-intro-copy" aria-labelledby="game-title">
            <h1 id="game-title">KLAAR VOOR<br /><span>DE BEKLIMMING?</span></h1>
            <p className="game-lead">Iedereen begint aan dezelfde route. Beantwoord zeven open vragen; zeldzame antwoorden brengen je verder.</p>
            <div className="game-rules" aria-label="Spelregels">
              <div><span className="rule-index">01</span><p><strong>ZEVEN VRAGEN</strong><br />Eén nieuwe route per ronde.</p></div>
              <div><span className="rule-index">02</span><p><strong>3 SECONDEN VOORUITKIJKEN</strong><br />Daarna krijg je 25 seconden per vraag.</p></div>
              <div><span className="rule-index">03</span><p><strong>OPEN ANTWOORDEN</strong><br />Typ je antwoord. Fout? Probeer opnieuw zolang de tijd loopt.</p></div>
            </div>
            <button className="button button-primary" type="button" onClick={beginRound}>
              BEGIN DE KLIM <span aria-hidden="true">↗</span>
            </button>
            {setupError && <p className="game-error" role="alert">{setupError}</p>}
            <Link className="back-link" href="/">← TERUG NAAR HET BASISKAMP</Link>
          </section>
          <aside className="game-intro-aside" aria-label="Omgeving en expeditie-informatie">
            <GameIntroArtwork className="game-environment--intro" />
            <div className="ascent-readout">
              <div className="readout-top"><span>ROUTEKAART</span><span>DEMO</span></div>
              <div className="readout-stat"><strong>07</strong><span>OPEN VRAGEN</span></div>
              <div className="readout-stat"><strong>25</strong><span>SECONDEN PER VRAAG</span></div>
              <div className="readout-bottom"><span>MAXIMALE SCORE</span><span>{MAX_SCORE} PT</span></div>
              <div className="readout-coordinates"><span>MAXIMALE HOOGTE</span><span>{MAX_DEPTH_METERS.toLocaleString("nl-NL")} M</span></div>
            </div>
          </aside>
        </div>
      )}

      {(game.phase === "preview" || game.phase === "answering") && currentQuestion && (
        <section className="game-play-layout" aria-labelledby="question-title">
          <SceneArtwork alt="A monumental stone gateway leading toward the sun." className="game-environment--active" objectFit="cover" objectPosition="center 38%" variant="gateway" />
          <div className="game-play-content">
          <div className="game-play-topline">
            <div>
              <p className="game-overline">ETAPPE {String(game.currentIndex + 1).padStart(2, "0")} / {QUESTION_COUNT}</p>
              <div className="game-progress" aria-label={`Vraag ${game.currentIndex + 1} van ${QUESTION_COUNT}`}>
                {Array.from({ length: QUESTION_COUNT }, (_, index) => (
                  <span className={index <= game.currentIndex ? "is-current" : ""} key={index} />
                ))}
              </div>
            </div>
            <div className={`game-clock ${secondsRemaining <= 5 && game.phase === "answering" ? "is-urgent" : ""}`} role="timer" aria-label={`${secondsRemaining} seconden resterend`}>
              <strong>{String(secondsRemaining).padStart(2, "0")}</strong><span>SEC</span>
            </div>
          </div>

          <p className="question-category">{currentQuestion.category}</p>
          <h1 className="question-prompt" id="question-title">{currentQuestion.prompt}</h1>

          {game.phase === "preview" ? (
            <div className="question-preview" role="status" aria-live="assertive">
              <span className="preview-count">{secondsRemaining}</span>
              <span>Neem de vraag alvast in je op. Je antwoordtijd begint zo.</span>
            </div>
          ) : (
            <form className="answer-form" onSubmit={handleSubmit}>
              <label className="answer-label" htmlFor="game-answer">JOUW ANTWOORD</label>
              <div className="answer-controls">
                <input
                  autoComplete="off"
                  autoFocus
                  className="answer-input"
                  id="game-answer"
                  maxLength={120}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder="Typ je antwoord…"
                  required
                  spellCheck={false}
                  value={answer}
                />
                <button className="button button-primary answer-submit" type="submit">
                  CONTROLEER <span aria-hidden="true">↗</span>
                </button>
              </div>
              <p aria-atomic="true" aria-live="polite" className={`answer-feedback ${game.feedback?.kind === "incorrect" ? "has-error" : ""}`} id="answer-feedback" role="status">
                {game.feedback?.kind === "incorrect" || game.feedback?.kind === "empty" ? game.feedback.text : "Druk op Enter of controleer je antwoord."}
              </p>
            </form>
          )}

          <div className="game-live-stats" aria-label="Huidige score">
            <span>TOTAALSCORE <strong>{game.score}</strong></span>
            <span>HOOGTE <strong>{currentDepth.toLocaleString("nl-NL")} M</strong></span>
          </div>
          </div>
        </section>
      )}

      {game.phase === "feedback" && game.currentResult && (
        <section className={`round-feedback ${game.feedback?.kind === "timeout" ? "is-timeout" : "is-correct"}`} aria-labelledby="feedback-title" aria-live="assertive" role="status">
          {!game.currentResult.timedOut && (
            game.currentResult.rarity === "DEEP_CUT" || game.currentResult.rarity === "ONE_IN_A_KRILLION"
              ? <ClimbingFeedbackArtwork />
              : <WalkingFeedbackArtwork />
          )}
          <div className="feedback-content">
          <p className="game-overline">ETAPPE {String(game.currentIndex + 1).padStart(2, "0")} AFGEROND</p>
          <h1 id="feedback-title">{game.currentResult.timedOut ? "DE TIJD IS OM." : "GOED GEVONDEN."}</h1>
          <p className="feedback-answer">{game.currentResult.timedOut ? "Een mogelijk goed antwoord:" : "Aanvaard antwoord:"} <strong>{game.currentResult.acceptedAnswer}</strong></p>
          {game.currentResult.rarity && (
            <div className="feedback-rarity">
              <span>{rarityLabels[game.currentResult.rarity] ?? game.currentResult.rarity}</span>
              <strong>+{game.currentResult.points} PUNTEN</strong>
            </div>
          )}
          {game.currentResult.timedOut && <p className="feedback-zero">0 punten voor deze vraag.</p>}
          <div className="feedback-totals">
            <span>TOTAALSCORE <strong>{game.score}</strong></span>
            <span>NIEUWE HOOGTE <strong>{currentDepth.toLocaleString("nl-NL")} M</strong></span>
          </div>
          <p className="feedback-next" aria-live="polite">De volgende etappe begint zo…</p>
          </div>
        </section>
      )}

      {game.phase === "result" && (
        <section className="final-result" aria-labelledby="result-title">
          <div className="result-heading">
            <div>
              <p className="game-overline">EXPEDITIE VOLTOOID</p>
              <h1 id="result-title">JE BENT BOVEN.</h1>
            </div>
            <ResultArtwork />
          </div>
          <div className="result-scoreboard">
            <div className="result-score-primary"><span>TOTAALSCORE</span><strong>{game.score}<small> / {MAX_SCORE}</small></strong></div>
            <div><span>BEREIKTE HOOGTE</span><strong>{currentDepth.toLocaleString("nl-NL")} M</strong></div>
            <div><span>GOED BEANTWOORD</span><strong>{game.correctCount} / {QUESTION_COUNT}</strong></div>
            <div><span>ONBEANTWOORD</span><strong>{game.unansweredCount}</strong></div>
          </div>

          <div className="rarity-achievements">
            <h2>ZELDZAME VONDSTEN</h2>
            <div className="rarity-list">
              {rarityOrder.map((rarity) => {
                const count = game.results.filter((result) => result.rarity === rarity).length;
                return (
                  <span className={count ? "earned" : ""} key={rarity}>
                    {rarityLabels[rarity] ?? rarity}{count > 0 ? ` · ${count}` : ""}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="round-summary">
            <h2>JOUW ZEVEN VRAGEN</h2>
            <ol className="result-list">
              {game.results.map((result, index) => (
                <li className="result-row" key={result.questionId}>
                  <div className="result-question"><span>{String(index + 1).padStart(2, "0")}</span><strong>{result.question.prompt}</strong></div>
                  <div className="result-answers">
                    <p>Jouw antwoord: <span>{result.playerAnswers.length ? result.playerAnswers.join(" → ") : "Geen antwoord"}</span></p>
                    <p>Goed antwoord: <span>{result.acceptedAnswer}</span></p>
                    <p>{result.rarity ? `${rarityLabels[result.rarity] ?? result.rarity} · ` : ""}{result.points} punten</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <button className="button button-primary restart-button" type="button" onClick={beginRound}>
            OPNIEUW BEGINNEN <span aria-hidden="true">↻</span>
          </button>
        </section>
      )}
    </main>
  );
}