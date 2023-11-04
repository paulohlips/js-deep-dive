const assert = require("assert")
const File = require("./src/file")
const { errors } = require("./src/constants")

;(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const expected = new Error(errors.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }


})()