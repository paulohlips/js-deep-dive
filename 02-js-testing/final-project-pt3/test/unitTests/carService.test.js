const { describe, it, before, beforeEach, afterEach } = require("mocha")
const { expect, calledWithExactly } = require("chai")
const { join } = require("path")
const sinon = require("sinon")

const CarService = require("../../src/service/carService")

const carsDatabase = join(__dirname, "../../database", "cars.json")
const mocks = {
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json")
}
describe("CarService test suite", async () => {
  let carService = {}
  let sandBox = {}
  before(() => {
    carService = new CarService({
      cars: carsDatabase
    })
  })

  beforeEach(() => {
    sandBox = sinon.createSandbox()
  })

  afterEach(() => {
    sandBox.restore()
  })
  it("should retrieve a random position from an array", () => {
    const data = [1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it("should choose the first id from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory
    const carIndex = 0

    sandBox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIndex]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it("should return an available car in a carCategory", async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandBox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).returns(car)

    sandBox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)

  })

  it("given a carCategory, customer, and numberOfDays it should calculate final amount in BRL", () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50

    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6

    const numberOfDays = 5

    sandBox.stub(
      carService,
      "taxesBasedOnAge"
    ).get(() => [{ from: 40, to: 50, taxBasedOnAge: 1.3 }])

    const expected = carService.currencyFormat.format(244.40)
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )

    expect(result).to.be.deep.equal(expected)
  })
})