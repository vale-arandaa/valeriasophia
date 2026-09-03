const BASE_URL = process.env.HUB_BASE_URL || "https://agents.vlouxe.com";
const HUB_USERNAME = process.env.HUB_USERNAME || "";
const HUB_PASSWORD = process.env.HUB_PASSWORD || "";

async function main() {
  if (!HUB_PASSWORD) throw new Error("HUB_PASSWORD not set");

  const loginRes = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: HUB_USERNAME, password: HUB_PASSWORD }),
    redirect: "manual",
  });
  const setCookie = loginRes.headers.get("set-cookie");
  if (!setCookie) throw new Error(`login failed (status ${loginRes.status}), no session cookie returned`);
  const cookie = setCookie.split(";")[0];

  const res = await fetch(`${BASE_URL}/api/agents/automatizacion/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ question: "" }),
  });

  console.log(await res.text());
}

main().catch((err) => {
  console.error("[cron-automatizacion] failed:", err);
  process.exit(1);
});
