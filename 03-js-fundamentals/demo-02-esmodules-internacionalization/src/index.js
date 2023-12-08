import chalk from "chalk"
import chalkTable from "chalk-table"
import Draflog from "draftlog"
import database from "../src/database.json" assert { type: "json" }

Draflog(console).addLineListener(process.stdin)

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID")},
    { field: "vehicles", name: chalk.cyan("Vehicles")},
    { field: "kmTraveled", name: chalk.cyan("Km Traveled")},
    { field: "from", name: chalk.cyan("From")},
    { field: "to", name: chalk.cyan("To")},
  ]
}

const table = chalkTable(options, database)
const print = console.draft(table)