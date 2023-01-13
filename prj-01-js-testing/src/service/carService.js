const BaseRepository = require("../repository/base")

class CarService {
  constructor() {
    this.carRepository = new BaseRepository("cars")
  }

  getRadomPositionFromArray(carIds) {
    return Math.floor(
      Math.random()*(carIds.length)
    )
  }

  chooseRandomCar(carCategory) {
    const { carIds } = carCategory
    const randomId = this.getRadomPositionFromArray(carIds)
    return carCategory.carIds[randomId]
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    return await this.carRepository.find("cars")
  }

  async rent(carCategory) {
    return carCategory
  }
}

module.exports = CarService