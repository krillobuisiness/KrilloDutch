import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

import {
  OFFICIAL_BANK_PATH,
  getOfficialBankMissingMessage,
  getQuestionBankCandidates,
  parseOfficialQuestionBank
} from "@/lib/game/data/question-bank-adapter";

export async function GET() {
  const mode = process.env.NODE_ENV ?? "development";
  const candidates = getQuestionBankCandidates(mode).map((candidatePath) => path.join(process.cwd(), candidatePath));
  const questionBankPath = candidates.find((candidate) => existsSync(candidate));

  if (!questionBankPath) {
    return NextResponse.json({ error: getOfficialBankMissingMessage(mode) }, { status: 404 });
  }

  const isProductionBank = questionBankPath.endsWith(OFFICIAL_BANK_PATH.replace(/\//g, path.sep));
  if (mode === "production" && !isProductionBank) {
    return NextResponse.json({ error: getOfficialBankMissingMessage(mode) }, { status: 404 });
  }

  try {
    const source = readFileSync(questionBankPath, "utf8");
    const parsed = parseOfficialQuestionBank(source);
    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout bij het laden van de officiële vraagbank.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
