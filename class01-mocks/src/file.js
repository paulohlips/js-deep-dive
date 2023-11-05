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
  }
}

module.exports = File