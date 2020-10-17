addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const links = [
  {
  "name": "My LinkedIn Profile",
  "url" : "https://www.linkedin.com/in/narendramohanm/"
  },

  {
    "name": "My GitHub Account",
    "url" : "https://github.com/Narendramohanm"
  },

  {
    "name": "CloudFlare Project on GitHub",
    "url" : "https://github.com/Narendramohanm/CloudFlare-Coding-Challenge"
  }
]

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    links.forEach(link => {
      element.append(`<a href="${link.url} target="_blank">${link.name}</a>`, { html: true });
    })
  }
}

class ProfileTransformer {
  async element(element) {
    element.removeAttribute('style');
  }
}

class ProfilePrictureTransformer {
  async element(element) {
    element.setAttribute("src", "https://drive.google.com/uc?id=1NJUQ7HzemyHhhjPa3l1M4MaBhp0lrZo5");
    
  }
}

class UserNameTransformer{
  async element(element) {
    element.setInnerContent("Narendra Mohan M.");
  }
}

async function handleRequest(request) {

  const url = request.url

  if(url.indexOf("/links") != -1){
    const jsonData = JSON.stringify(links, null, 2)

    return new Response(jsonData, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  }
  else{
    
    const headers = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      }
    }

    const htmlResponse = await fetch("https://static-links-page.signalnerve.workers.dev", headers)

    return new HTMLRewriter()
      .on("div#links", new LinksTransformer())
      .on("div#profile", new ProfileTransformer())
      .on("img#avatar", new ProfilePrictureTransformer())
      .on("h1#name", new UserNameTransformer())
      .transform(htmlResponse)
  }

}
  
