const { describe, it, before, after } = require("mocha")
const supertest = require("supertest")
const assert = require("assert")

describe('API Suite Test', () => {
  let app
  before((done) => {
    app = require("./api")
    app.once("listening", done)
  })

  after(done => app.close(done))

  describe("/contact:get", () => {
    it('should request contact page and return HTTP status 200', async () => {
      const response = await supertest(app)
        .get("/contact")
        .expect(200)

        assert.strictEqual(response.text, "contact us page")
    })
  })

  describe("/login:post", () => {
    it('should request login and return HTTP status 200', async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "David",
          password: "123"
        })
        .expect(200)

        assert.strictEqual(response.text, "login succeed")
    })

    it('should request login and return HTTP status 403', async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "David",
          password: "1232"
        })
        .expect(403)

        assert.strictEqual(response.text, "login failed")
    })
  })
})