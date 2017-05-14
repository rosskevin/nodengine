'use strict'

var get = require('simple-get')
var URL = 'https://semver.io/node/versions'

function fetch (cb) {
  get.concat(URL, function (err, res, data) {
    if (err) return cb(err)
    var nodeVersions = data.toString().split('\n')
    return cb(null, nodeVersions)
  })
}

module.exports = fetch
