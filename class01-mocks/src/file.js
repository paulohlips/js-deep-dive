const { readFile } = require("fs/promises")
const { errors } = require("./constants")
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"]
}

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf8")
    const validation = this.isValid(content)
    if(!validation.valid) throw new Error(validation.error)
    return this.parseCSVToJSON(content)
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithOutHeaders] = csvString.split(/\r?\n/)

    const isValidHeader = header === options.fields.join(",")
    if (!isValidHeader) {
      return {
        error: errors.FILE_COLUMNS_ERROR_MESSAGE,
        valid: false
      }
    }

    if (!fileWithOutHeaders.length ||
      fileWithOutHeaders.length > options.maxLines) {
      return {
        error: errors.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return {
      error: null,
      valid: true
    }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/)
    //get header items
    const header = lines.shift().split(",")

    const users = lines.map(line => {
      const columns = line.split(",")
      let user = {}

      for (const index in columns) {
        user[header[index]] = columns[index].trim()
      }

      return user
    })

    return users
  }
}

module.exports = File