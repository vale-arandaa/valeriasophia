import { query } from "@anthropic-ai/claude-agent-sdk";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AGENTS, type AgentDef } from "./agents.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(__dirname, "..");
export const WORKSPACE_ROOT = join(ROOT, "workspace");

export function getAgent(id: string): AgentDef {
  const agent = AGENTS.find((a) => a.id === id);
  if (!agent) throw new Error(`Unknown agent: ${id}`);
  return agent;
}

export function agentWorkspace(id: string) {
  const base = join(WORKSPACE_ROOT, id);
  const data = join(base, "data");
  const reports = join(base, "reports");
  for (const dir of [data, reports]) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }
  return { base, data, reports };
}

export async function runAgent(
  agentId: string,
  question: string,
  onText?: (chunk: string) => void
): Promise<{ text: string; turns: number; ok: boolean }> {
  const agent = getAgent(agentId);
  const { base } = agentWorkspace(agentId);

  let text = "";
  let turns = 0;
  let ok = true;

  for await (const message of query({
    prompt: question.trim() || agent.defaultPrompt,
    options: {
      cwd: base,
      systemPrompt: { type: "custom", prompt: agent.systemPrompt },
      tools: ["Read", "Glob", "Grep", "Write"],
      permissionMode: "bypassPermissions",
    },
  })) {
    if (message.type === "assistant") {
      for (const block of message.message.content) {
        if (block.type === "text") {
          text += block.text;
          onText?.(block.text);
        }
      }
    } else if (message.type === "result") {
      turns = message.num_turns;
      ok = message.subtype === "success";
    }
  }

  return { text, turns, ok };
}
