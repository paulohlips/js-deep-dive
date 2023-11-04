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
    const [headers, ...fileWithOutHeaders] = csvString.split(/\r?\n/)
    if (!fileWithOutHeaders.filePath) {
      return {
        error: errors.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
  }
}

module.exports = File