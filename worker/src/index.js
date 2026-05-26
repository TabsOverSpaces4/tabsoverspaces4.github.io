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
    const headers = corsHeaders(origin);

    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers });
      }

      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers,
        });
      }

      let body;
      try {
        body = await request.json();
      } catch (_e) {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...headers },
        });
      }

      const { query, systemPrompt } = body;
      if (!query || !query.trim()) {
        return new Response(JSON.stringify({ error: "Missing query" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...headers },
        });
      }

      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
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

      if (!anthropicRes.ok) {
        const errText = await anthropicRes.text();
        return new Response(JSON.stringify({ error: errText }), {
          status: anthropicRes.status,
          headers: { "Content-Type": "application/json", ...headers },
        });
      }

      const data = await anthropicRes.json();
      const text = (data && data.content && data.content[0] && data.content[0].text) || "";

      return new Response(JSON.stringify({ text }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...headers },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || "Internal worker error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...headers },
      });
    }
  },
};
