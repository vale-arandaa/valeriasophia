import express from "express";
import type { NextFunction, Request, Response } from "express";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AGENTS } from "./agents.config.js";
import { agentWorkspace, getAgent, runAgent } from "./agent.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4321;
const HUB_USERNAME = process.env.HUB_USERNAME || "vlouxe";
const HUB_PASSWORD = process.env.HUB_PASSWORD || "";
const SESSION_COOKIE = "hub_session";
const validSessions = new Set<string>();

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));

function parseCookies(req: Request): Record<string, string> {
  const header = req.headers.cookie || "";
  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function isLoggedIn(req: Request): boolean {
  if (!HUB_PASSWORD) return true;
  const token = parseCookies(req)[SESSION_COOKIE];
  return !!token && validSessions.has(token);
}

const LOGIN_PAGE = `<!doctype html>
<html lang="es"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>VLOUXE — Iniciar sesión</title>
<style>
  body { margin:0; background:#0b0c10; color:#f2f2f5; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    height:100vh; display:flex; align-items:center; justify-content:center; }
  form { background:#14161c; border:1px solid #24262e; border-radius:12px; padding:32px; width:280px; }
  h1 { font-size:16px; margin:0 0 20px; }
  label { display:block; font-size:13px; color:#8a8d97; margin:14px 0 6px; }
  label:first-of-type { margin-top:0; }
  input { width:100%; background:#0e0f14; border:1px solid #24262e; border-radius:8px; color:#f2f2f5; padding:10px 12px; font-size:14px; box-sizing:border-box; }
  button { margin-top:20px; width:100%; background:#6b76ff; color:white; border:none; border-radius:999px; padding:11px; font-size:14px; font-weight:500; cursor:pointer; }
  .err { color:#f87171; font-size:13px; margin-top:12px; }
</style></head>
<body>
  <form method="POST" action="/login">
    <h1>VLOUXE Agents — Iniciar sesión</h1>
    <label for="u">Usuario</label>
    <input id="u" name="username" autocomplete="username" autofocus />
    <label for="p">Contraseña</label>
    <input id="p" name="password" type="password" autocomplete="current-password" />
    <button type="submit">Entrar</button>
    __ERROR__
  </form>
</body></html>`;

app.get("/login", (_req: Request, res: Response) => {
  res.type("html").send(LOGIN_PAGE.replace("__ERROR__", ""));
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body ?? {};
  if (username === HUB_USERNAME && password === HUB_PASSWORD) {
    const token = randomBytes(24).toString("hex");
    validSessions.add(token);
    res.set(
      "Set-Cookie",
      `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax${
        req.secure ? "; Secure" : ""
      }`
    );
    return res.redirect("/");
  }
  res
    .type("html")
    .status(401)
    .send(LOGIN_PAGE.replace("__ERROR__", '<div class="err">Usuario o contraseña incorrectos.</div>'));
});

const LEAD_ORIGINS = new Set([
  "https://vlouxe.com",
  "https://www.vlouxe.com",
  "http://localhost:3000",
]);

function withCors(req: Request, res: Response) {
  const origin = req.headers.origin;
  if (origin && LEAD_ORIGINS.has(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
  }
}

app.options("/api/leads", (req: Request, res: Response) => {
  withCors(req, res);
  res.sendStatus(204);
});

app.post("/api/leads", (req: Request, res: Response) => {
  withCors(req, res);
  const { name, email, message } = req.body ?? {};
  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim() ||
    name.length > 200 || email.length > 200 || message.length > 5000
  ) {
    return res.status(400).json({ error: "invalid submission" });
  }

  const { data } = agentWorkspace("automatizacion");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const content = [
    `fecha: ${new Date().toISOString()}`,
    `fuente: sitio web (vlouxe.com)`,
    `nombre: ${name.trim()}`,
    `email: ${email.trim()}`,
    `mensaje: ${message.trim()}`,
  ].join("\n");
  writeFileSync(join(data, `lead-${stamp}.txt`), content, "utf8");

  res.status(201).json({ ok: true });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!HUB_PASSWORD || isLoggedIn(req)) return next();
  if (req.path.startsWith("/api/")) return res.status(401).json({ error: "not logged in" });
  res.redirect("/login");
});

app.use(express.static(join(__dirname, "..", "public")));

function listDir(dir: string) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => !f.startsWith("."))
    .sort()
    .reverse();
}

app.get("/api/agents", (_req: Request, res: Response) => {
  res.json(AGENTS.map(({ id, name, tagline, notesLabel, notesPlaceholder, questionPlaceholder }) => ({
    id, name, tagline, notesLabel, notesPlaceholder, questionPlaceholder,
  })));
});

app.get("/api/agents/:id/files", (req: Request, res: Response) => {
  const id = String(req.params.id);
  try {
    getAgent(id);
  } catch {
    return res.status(404).json({ error: "unknown agent" });
  }
  const { data, reports } = agentWorkspace(id);
  res.json({ data: listDir(data), reports: listDir(reports) });
});

app.get("/api/agents/:id/report/:name", (req: Request, res: Response) => {
  const id = String(req.params.id);
  const name = String(req.params.name);
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

app.post("/api/agents/:id/analyze", async (req: Request, res: Response) => {
  const id = String(req.params.id);
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
  if (!HUB_PASSWORD) {
    console.warn(
      "[hub] HUB_PASSWORD no está configurada — el panel queda SIN contraseña. Ok en local, nunca en producción."
    );
  }
  console.log(`\n[hub] VLOUXE Agents running at http://localhost:${PORT}\n`);
});
