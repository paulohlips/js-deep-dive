const { describe, it, before } = require("mocha")
const assert = require("assert")
const { expect } = require("chai")
const { join } = require("path")
const CarService = require("../../src/service/carService")

const carsDatabase = join(__dirname, "../../database", "cars.json")
const mocks = {
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json")
}
describe("CarService test suite", async () => {
  let carService = {}
  before(() => {
    carService = new CarService({
      cars: carsDatabase
    })
  })

/*   it('should return an available car in a carCategory', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    const result = await carService.getAvailableCar(carCategory)
    const expected = car
    expect(result).to.be.deep.equal(expected)

  }) */
})