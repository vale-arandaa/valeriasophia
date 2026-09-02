# VLOUXE Agents Hub

One panel with all of VLOUXE's internal agents — Sales, Marketing, Customer
Support, Operations, Research, Analytics, Executive Assistant, and Content.
Same engine ([Claude Agent SDK](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk))
behind all of them, each with its own role, its own data folder, and its own
saved reports.

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
3. Go to **API Keys** → **Create Key**. Copy it (starts with `sk-ant-`).
   You won't be able to see it again after leaving the page.

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

## Adding or editing an agent

All 8 agents are defined in one place: [`src/agents.config.ts`](src/agents.config.ts).
Each entry is just a name, tagline, UI placeholders, and a system prompt — add
a new object to the `AGENTS` array to add an agent, no other code changes needed.
