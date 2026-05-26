const ALLOWED_ORIGINS = [
  "https://tabsoverspaces4.github.io",
  "http://localhost:5173",
  "http://localhost:4173",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON body", { status: 400 });
    }

    const { query, systemPrompt } = body;
    if (!query?.trim()) {
      return new Response("Missing query", { status: 400 });
    }

    let anthropicRes;
    try {
      anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: systemPrompt || "",
          messages: [{ role: "user", content: query }],
        }),
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Failed to reach Anthropic API" }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      return new Response(
        JSON.stringify({ error: errText }),
        { status: anthropicRes.status, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    const data = await anthropicRes.json();
    const text = data?.content?.[0]?.text || "";

    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
    );
  },
};
