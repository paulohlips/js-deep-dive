const BaseRepository = require("../repositories/base/baseRepository");
const Tax = require("../entities/tax")

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars})
    this.taxesBasedOnAge = Tax.taxesBasedOnAge
    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL"
    })
  }

  getRandomPositionFromArray(list) {
    const listLen = list.length
    return Math.floor(Math.random() * listLen)
  }

  chooseRandomCar(carCategory) {
    const randomIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomIndex]
    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    return this.carRepository.find(carId)
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const price = carCategory.price
    const { taxBasedOnAge } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    console.log(taxBasedOnAge)
    const finalPrice = ((taxBasedOnAge * price) * numberOfDays)
    return this.currencyFormat.format(finalPrice)
  }
}

module.exports = CarService