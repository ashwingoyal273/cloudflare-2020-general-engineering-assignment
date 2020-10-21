var links_arr = [{ "name": "Google", "url": "https://www.google.com" },
{ "name": "Facebook", "url": "https://www.facebook.com" },
{ "name": "Cloudflare", "url": "https://www.cloudflare.com" }
]

addEventListener('fetch', event => {
  console.log(`Received new request: ${event.request.url}`)
  event.respondWith(handleRequest(event.request))
})


/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.url.endsWith("/links")) {
  return new Response(JSON.stringify(links_arr), {
    headers: { 'content-type': 'application/json' },
  })}
  else{
    return new Response("Hello World", {
      headers: { 'content-type' : 'text/plain' }
    })
  }
}
