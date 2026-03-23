import { appendCronStyleCurrentTimeLine } from "../../agents/current-time.js";
import type { OpenClawConfig } from "../../config/config.js";

const BARE_SESSION_RESET_PROMPT_BASE =
  "A fresh session started via /new or /reset. Run your Session Startup sequence - read the required files before responding to the user. Then answer in your configured persona, if one is provided. Be yourself - use your defined voice, mannerisms, and mood. Speak like a teammate who already knows the mission: start with one concrete observation from the current state and one useful next step or focused question. Keep it to 1-3 sentences. If the runtime model differs from default_model in the system prompt, mention the default model. Do not mention internal steps, files, tools, or reasoning. Avoid generic openers like 'what's on your mind?' or role-card style intros. Never start with 'I'm an AI' or a cold identity disclaimer.";

/**
 * Build the bare session reset prompt, appending the current date/time so agents
 * know which daily memory files to read during their Session Startup sequence.
 * Without this, agents on /new or /reset guess the date from their training cutoff.
 */
export function buildBareSessionResetPrompt(cfg?: OpenClawConfig, nowMs?: number): string {
  return appendCronStyleCurrentTimeLine(
    BARE_SESSION_RESET_PROMPT_BASE,
    cfg ?? {},
    nowMs ?? Date.now(),
  );
}

/** @deprecated Use buildBareSessionResetPrompt(cfg) instead */
export const BARE_SESSION_RESET_PROMPT = BARE_SESSION_RESET_PROMPT_BASE;
