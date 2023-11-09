const BaseRepository = require("../repositories/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars})
  }

  getRandomPositionFromArray(list) {
    const listLen = list.length
    return Math.floor(Math.random() * listLen)
  }
  async getAvailableCar() {
    return this.carRepository.find()
  }
}

module.exports = CarService