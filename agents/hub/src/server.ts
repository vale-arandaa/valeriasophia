import express from "express";
import type { NextFunction, Request, Response } from "express";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AGENTS } from "./agents.config.js";
import { agentWorkspace, getAgent, runAgent } from "./agent.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4321;
const HUB_USERNAME = process.env.HUB_USERNAME || "vlouxe";
const HUB_PASSWORD = process.env.HUB_PASSWORD || "";

const app = express();
app.use(express.json({ limit: "5mb" }));

if (HUB_PASSWORD) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization || "";
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      const [user, pass] = Buffer.from(encoded, "base64").toString().split(":");
      if (user === HUB_USERNAME && pass === HUB_PASSWORD) return next();
    }
    res.set("WWW-Authenticate", 'Basic realm="VLOUXE Agents"');
    res.status(401).send("Autenticación requerida.");
  });
} else {
  console.warn(
    "[hub] HUB_PASSWORD no está configurada — el panel queda SIN contraseña. Ok en local, nunca en producción."
  );
}

app.use(express.static(join(__dirname, "..", "public")));

function listDir(dir: string) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => !f.startsWith("."))
    .sort()
    .reverse();
}

app.get("/api/agents", (_req, res) => {
  res.json(AGENTS.map(({ id, name, tagline, notesLabel, notesPlaceholder, questionPlaceholder }) => ({
    id, name, tagline, notesLabel, notesPlaceholder, questionPlaceholder,
  })));
});

app.get("/api/agents/:id/files", (req, res) => {
  try {
    getAgent(req.params.id);
  } catch {
    return res.status(404).json({ error: "unknown agent" });
  }
  const { data, reports } = agentWorkspace(req.params.id);
  res.json({ data: listDir(data), reports: listDir(reports) });
});

app.get("/api/agents/:id/report/:name", (req, res) => {
  const { id, name } = req.params;
  if (name.includes("/") || name.includes("..")) return res.status(400).json({ error: "invalid name" });
  try {
    getAgent(id);
  } catch {
    return res.status(404).json({ error: "unknown agent" });
  }
  const { reports } = agentWorkspace(id);
  const path = join(reports, name);
  if (!existsSync(path)) return res.status(404).json({ error: "not found" });
  res.type("text/markdown").send(readFileSync(path, "utf8"));
});

app.post("/api/agents/:id/analyze", async (req, res) => {
  const { id } = req.params;
  let agent;
  try {
    agent = getAgent(id);
  } catch {
    return res.status(404).json({ error: "unknown agent" });
  }

  const { question = "", notes = "" } = req.body ?? {};
  const { data, reports } = agentWorkspace(id);

  if (typeof notes === "string" && notes.trim()) {
    if (!existsSync(data)) mkdirSync(data, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    writeFileSync(join(data, `input-${stamp}.txt`), notes.trim(), "utf8");
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = (event: string, payload: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`);
  };

  try {
    const { ok, turns } = await runAgent(id, question, (chunk) => send("chunk", { chunk }));
    send("done", { ok, turns, reports: listDir(reports) });
  } catch (err) {
    send("error", { message: err instanceof Error ? err.message : String(err) });
  } finally {
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`\n[hub] VLOUXE Agents running at http://localhost:${PORT}\n`);
});
