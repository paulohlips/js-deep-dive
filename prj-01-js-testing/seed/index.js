const faker = require("faker")
const { writeFile } = require("fs/promises")
const { join } = require("path")

const Car = require("../src/entity/car")
const CarCategory = require("../src/entity/carCategory")
const Consumer = require("../src/entity/consumer")


const DATABASE_PATH = join(__dirname, "..", "database")
const AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const consumers = []
for (let index = 0; index <= AMOUNT; index++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carIds.push(car.id)
  cars.push(car)
  
  const consumer = new Consumer({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    age: faker.datatype.number({ min: 18, max: 50})
  })
  consumers.push(consumer)
}

const writer = async (fileName, data) => writeFile(fileName, data)

;(async () => {
  await writer(`${DATABASE_PATH}/carCategory.json`, JSON.stringify([carCategory]))
  await writer(`${DATABASE_PATH}/cars.json`, JSON.stringify(cars))
  await writer(`${DATABASE_PATH}/consumers.json`, JSON.stringify(consumers))
})()

