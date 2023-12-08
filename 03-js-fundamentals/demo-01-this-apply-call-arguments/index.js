"use-strict"

const { watch, promises: { readFile }} = require("fs")

class File {

  watchFile (event, filename) {
    console.log("watch", this)
    console.log("arguments", arguments)
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}
console.log("File", this)

const file = new File()

// looks to watch function context
//watch(__filename, file.watchFile)
// forces JS to look to class File context
//watch(__filename, file.watchFile.bind(file))

file.watchFile.call({ showContent: () => console.log('call: hello!')}, null, __filename)
// file.watchFile.apply({ showContent: () => console.log('call: hello!')}, [null, __filename])