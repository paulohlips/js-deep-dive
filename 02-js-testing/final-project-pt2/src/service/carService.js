const BaseRepository = require("../repositories/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars})
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
}

module.exports = CarService