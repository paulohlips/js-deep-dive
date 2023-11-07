const http = require("http")
const { once } = require('events')

const DEFAULT_USER = {
  username: "David",
  password: "123"
}

const routes = {
  "/contact:get": (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  "/login:post": async (request, response) => {
    const data = JSON.parse(await once(request, "data"))
    if(
      data.username !== DEFAULT_USER.username ||
      data.password !== DEFAULT_USER.password
    ) {
      response.writeHead(403)
      response.write('login failed')
      return response.end()
    }
    return response.end()
  },
  default: (request, response) => {
    response.writeHead(404)
    return response.end()
  }
}

function handler(request, response) {
  const { url, method } = request
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  console.log({ routeKey })
  const chosen = routes[routeKey] || routes.default

  return chosen(request, response)
}

const app = http.createServer(handler).
listen(3000, () => console.log("running on port 3000"))