'use strict'

var waterfall = require('async').waterfall
var semver = require('semver')

function _switch (nodeVersion) {
  var createSwitcher = require('./switcher')
  var config = require('./config')

  var tasks = [
    function loadConfig (next) {
      return config(next)
    },
    function getSwitcher (versions, next) {
      var currentVersion = process.versions.node
      var maxSatisfyVersion = semver.maxSatisfying(versions, nodeVersion)
      var switcher = createSwitcher(maxSatisfyVersion, currentVersion)

      switcher.getBin(function (err, bin) {
        return next(err, switcher, bin)
      })
    }
  ]

  waterfall(tasks, function (err, switcher, bin) {
    if (err) throw err
    if (bin) return switcher.spawn(bin)
  })
}

module.exports = _switch
