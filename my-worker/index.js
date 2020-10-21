const links_arr = [{ "name": "LinkedIn", "url": "https://www.linkedin.com/in/ag273/" },
{ "name": "Github", "url": "https://github.com/ashwingoyal273" },
{ "name": "Cloudflare", "url": "https://www.cloudflare.com" }
]

class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    let l;
    for (l = 0; l < this.links.length; l++) {
      element.append("<a href=" + this.links[l]["url"] + " target=\"_blank\"" + ">" + this.links[l]["name"] + "</a>", { html: true });
    }
  }
}

class SetInnerContent {
  constructor(inner) {
    this.inner = inner
  }

  async element(element) {
    element.setInnerContent(this.inner)
  }
}

class RemoveDisplayNone {
  constructor(obj) {
    this.obj = obj
  }

  async element(element) {
    element.removeAttribute(this.obj)
  }
}


class SetAvatarSrc {
  constructor(imglink) {
    this.imglink = imglink
  }

  async element(element) {
    element.setAttribute("src", this.imglink)
  }
}

const htmlrewriter =  new HTMLRewriter()
.on("div#profile", new RemoveDisplayNone("style"))
.on("div#links", new LinksTransformer(links_arr))
.on("title", new SetInnerContent("Ashwin Goyal - Social Links"))
.on("img#avatar", new SetAvatarSrc("https://tinyurl.com/y3cplf4o"))


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
    const staticLink = "https://static-links-page.signalnerve.workers.dev"
    const response = await fetch(staticLink, {
      headers: { 'content-type': 'text/html' },
    })
    return htmlrewriter.transform(response)
  }
}
