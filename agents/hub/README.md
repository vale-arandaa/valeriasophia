# VLOUXE Agents Hub

Two agents, on one panel, on the same engine ([Claude Agent SDK](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk)):

- **Agente de Automatización** (`automatizacion`) — does the repetitive work: follows up leads, drafts customer replies, organizes pending tasks, drafts content. One flexible agent instead of a separate one per function.
- **Agente de Optimización** (`analytics`) — reads real business data and tells you what to fix.

Each has its own data folder and its own saved reports.

## Run it locally (free, uses your Claude Code login)

```bash
npm install
npm run web
```

Open http://localhost:4321. No `ANTHROPIC_API_KEY` needed locally — it uses
your existing `claude` CLI login. No password needed locally either.

Each agent gets its own workspace at `workspace/<agent-id>/data` (paste
input there via the UI) and `workspace/<agent-id>/reports` (its output). That
folder is gitignored — nothing in it gets committed.

## Deploying it to agents.vlouxe.com

This needs a persistent Node process (it spawns the agent engine per
request), so it can't run on an edge/serverless platform like Cloudflare
Workers. The plan: **Render** hosts the app, **Cloudflare** just points the
subdomain at it (DNS only — you said that's how you already use Cloudflare
for vlouxe.com).

### 1. Get an Anthropic API key
1. Go to https://console.anthropic.com → sign in (or create an account).
2. Add a payment method under **Billing** — this key is billed per use,
   separate from your Claude subscription.
3. Go to **API Keys** → **Create Key**. When it asks for a **Workspace**,
   pick a specific one (e.g. "Default") — don't leave it as an
   identity-linked/"same as account" key, those require an extra
   `anthropic-workspace-id` header this app doesn't send, and every request
   fails with `400 anthropic-workspace-id is required`.
4. Copy it (starts with `sk-ant-`). You won't be able to see it again after
   leaving the page.

### 2. Push this repo to GitHub
Render deploys from a GitHub repo. If `vlouxe` isn't on GitHub yet:
```bash
cd vlouxe
gh repo create vlouxe --private --source=. --push
```
(or create the repo on github.com and `git push` normally.)

### 3. Deploy on Render
1. Go to https://render.com → sign up / log in.
2. **New** → **Web Service** → connect the `vlouxe` GitHub repo.
3. Render should detect `agents/hub/render.yaml` automatically (or set
   manually: root directory `agents/hub`, build command `npm install`,
   start command `npm run start`).
4. Set the environment variables it asks for:
   - `ANTHROPIC_API_KEY` — the key from step 1
   - `HUB_PASSWORD` — a password you choose, to keep the panel private
   - `HUB_USERNAME` — optional, defaults to `vlouxe`
5. Deploy. Render gives you a `*.onrender.com` URL — confirm the panel loads
   there and asks for a login before adding the custom domain.

### 4. Point agents.vlouxe.com at it
1. In Render, on the service → **Settings** → **Custom Domains** → add
   `agents.vlouxe.com`. Render shows you a CNAME target.
2. In Cloudflare's DNS for `vlouxe.com`, add a **CNAME** record:
   `agents` → the target Render gave you. Keep the proxy status as Render
   instructs (usually **DNS only**, not proxied, for the TLS handshake to work).
3. Wait for DNS to propagate (usually minutes), then visit
   `https://agents.vlouxe.com` and log in with `HUB_USERNAME` / `HUB_PASSWORD`.

## Real leads + a fully automatic Automation Agent

The site's contact form (`FinalCTA.tsx` on the main vlouxe.com site) posts to
`POST /api/leads` on this app, which writes each submission straight into
the Automation Agent's `workspace/automatizacion/data/`. No manual
copy-pasting needed — whatever a visitor submits is what the agent sees.

To make it run on its own every morning (not just when someone opens the
panel and clicks a button):

1. In Render, **New** → **Cron Job** → connect the same GitHub repo.
2. Root directory: `agents/hub`. Build command: `npm install`. Command:
   `npm run cron:automatizacion`.
3. Schedule: `0 13 * * *` (13:00 UTC — adjust for your timezone).
4. Environment variables: `HUB_USERNAME`, `HUB_PASSWORD` (same values as the
   web service), and `HUB_BASE_URL=https://agents.vlouxe.com`.

Each run logs in, asks the Automation Agent to work through whatever's in
`workspace/automatizacion/data/`, and the report lands in
`workspace/automatizacion/reports/` — visible next time you open the panel,
with zero manual steps.

## Adding or editing an agent

Both agents are defined in one place: [`src/agents.config.ts`](src/agents.config.ts).
Each entry is just a name, tagline, UI placeholders, and a system prompt — add
a new object to the `AGENTS` array to add another agent, no other code
changes needed.
