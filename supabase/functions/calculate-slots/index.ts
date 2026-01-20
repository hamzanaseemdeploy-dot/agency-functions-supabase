// Supabase Edge wrapper for Netlify function
import handlerModule from "../../../netlify/functions/calculate-slots.js"

const handler = handlerModule.handler || handlerModule

Deno.serve(async (req) => {
  let body = null

  if (req.method !== "GET") {
    try {
      body = await req.text()
    } catch (_) {}
  }

  const event = {
    httpMethod: req.method,
    body,
    headers: Object.fromEntries(req.headers),
  }

  const result = await handler(event, {})

  return new Response(result.body, {
    status: result.statusCode || 200,
    headers: result.headers || { "Content-Type": "text/plain" },
  })
})
