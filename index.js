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

async function handleRequest(request) {

  
    let response
    response = new Response('Hello worker!', {
      headers: { 'content-type': 'text/plain' },
    })
  
    return response
}
