const assert = require("assert")
const File = require("./src/file")
const { errors } = require("./src/constants")

;(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv"
    const expected = new Error(errors.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = "./mocks/invalid-header.csv"
    const expected = new Error(errors.FILE_COLUMNS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = "./mocks/fiveItems-invalid.csv"
    const expected = new Error(errors.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = "./mocks/threeItems-valid.csv"
    const expected = [    {
      id: '1',
      name: 'xuxa da silva',
      profession: 'developer',
      age: '120'
    },
    {
      id: '2',
      name: 'jose da silva',
      profession: 'manager',
      age: '30'
    },
    { id: '3', name: 'zezin', profession: 'QA', age: '25' }]
    const result = await File.csvToJson(filePath)
    await assert.deepEqual(expected, result)
  }
})()