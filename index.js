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
    element.setAttribute("class", "bg-teal-600");
  }
}

class SocialLinkTransformer{
  async element(element){
    element.removeAttribute('style')
    element.append(`<a href="https://www.facebook.com/narendra.mohanm.17" target="_blank"><img src=\"https://simpleicons.org/icons/facebook.svg"></a>`, { html: true });
    element.append(`<a href="https://www.linkedin.com/in/narendramohanm/" target="_blank"><img src=\"https://simpleicons.org/icons/twitter.svg"></a>`, { html: true });
    element.append(`<a href="https://www.instagram.com/mohan_narendra17/" target="_blank"><img src=\"https://simpleicons.org/icons/instagram.svg"></a>`, { html: true });
  }
}

class TitleTransformer {
  async element(element){
    element.setInnerContent("Narendra Mohan M.")
  }
}

class BGColorTransformer{
  async element(element){
    element.setAttribute("class", "bg-teal-600");
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
      .on("div#social", new SocialLinkTransformer())
      .on("title", new TitleTransformer())
      .on("body", new BGColorTransformer())
      .transform(htmlResponse)
  }

}
  
