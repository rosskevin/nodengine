'use strict'

var URL = 'https://semver.io/node/versions'
var get = require('simple-get')

module.exports = function fetch (cb) {
  get.concat(URL, function (err, res, data) {
    if (err) return cb(err)
    var nodeVersions = data.toString().split('\n')
    return cb(null, nodeVersions)
  })
}
