const assert = require("assert")
const { expect } = require("chai")
const sinon = require("sinon")

const CarService = require("../../src/service/carService")

const mocks = {
  car: require("../mocks/valid-car.json"),
  carCategory: require("../mocks/valid-carCategory.json"),
  consumer: require("../mocks/valid-consumer.json")
}

/*
  {
    "id": "3ab32885-8f68-49ae-b987-9225072a9c71",
    "name": "Cargo Van",
    "carIds": [
      "5c921b5b-2d64-4594-9cb1-b0160c9ba180",
      "66559ff2-c121-4bc0-bf5f-1d1f50dd090f",
      "28027abe-1fe7-4291-9c83-aa174b158e1a"
    ],
    "price": "62.56"
  }
*/


/* 
  Passa a categoria, 
  escolhe um numero aleatório entre 0 e numero de ids em carIds, 
  retorna o carro em questão
*/

describe("Car Service Test Suite", () => {
  let carService = {}
  let sandBox = {}
  
  before(() => {
    carService = new CarService()
  })

  beforeEach(() => {
    sandBox = sinon.createSandbox()
  })

  afterEach(() => {
    sandBox.restore()
  })

  it("should return a random array position", () => {
    const fakeCarIds = [1, 2, 3, 4, 5, 6, 7]
    const response = carService.getRadomPositionFromArray(fakeCarIds)
    expect(response).to.be.gte(0).and.lte(fakeCarIds.length)
  })

  it("should return first car into a given category", () => {
    const carIndex = 0

    sandBox.stub(
      carService,
      carService.getRadomPositionFromArray.name
    ).returns(carIndex)

    const result = carService.chooseRandomCar(mocks.carCategory)
    const expected = mocks.carCategory.carIds[carIndex]

    expect(result).to.be.equal(expected)
  })

    it("should return a random car of a given category", async () => {
    const car = mocks.car
    const carCategory = Object.create(mocks.carCategory)
    carCategory.carIds = [car.id]

    sandBox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).returns(car)

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(result).to.be.equal(expected)
  })
})