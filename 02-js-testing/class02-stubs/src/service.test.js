const assert = require("assert")
const { createSandbox } = require ("sinon")
const Service = require("./service")
const BASE_URL_1 = "https://swapi.dev/api/planets/1"
const BASE_URL_2 = "https://swapi.dev/api/planets/2"
const mocks = {
  alderaan: require("../mocks/alderaan.json"),
  tatooine: require("../mocks/tatooine.json")
}

;(async () => {
  const sinon = createSandbox()
  const service = new Service()
  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )
  //stubs: when need access external resources
  //spies: check behavior
  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearsIn: 5
    }
    const result = await service.getPlanets(BASE_URL_1)
    assert.deepStrictEqual(result, expected)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearsIn: 2
    }
    const result = await service.getPlanets(BASE_URL_2)
    assert.deepStrictEqual(result, expected)
  }
})()