const { readFile } = require("fs/promises")
const { join } = "fs"

class BaseRepository {
  constructor({ file }) {
    this.file = file
  }

  async find(data){
    const entity = await readFile(join(__dirname, "..", "..", "database", `${data}.json`))
    if (!data) entity
    
    return entity.find(car => car.id === data)
  }
}

module.exports = BaseRepository