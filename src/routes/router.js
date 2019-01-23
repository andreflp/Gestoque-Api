const fs = require('fs')
const path = require('path')

module.exports = fs
  .readdirSync('../../Dev/gestoque-api/src/routes')
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => require(path.resolve(__dirname, file)))
