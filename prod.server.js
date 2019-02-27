const express = require('express')
var config = require('./config/index')
const app = express()

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port

module.export = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listen at http://localhost:' + port + '\n')
})