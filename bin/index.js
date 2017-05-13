#!/usr/bin/env node

'use strict'

require('meow')(require('../package.json'))

var waterfall = require('async').waterfall
var semver = require('semver')
var path = require('path')

var config = require('./config')
var createSwitcher = require('./switcher')

var pkg = require(path.resolve('package.json'))
var rangeVersion = pkg.engines && pkg.engines.node

if (!rangeVersion) process.exit()

var tasks = [
  function loadConfig (next) {
    return config(next)
  },
  function getSwitcher (versions, next) {
    var currentVersion = process.versions.node
    var maxSatisfyVersion = semver.maxSatisfying(versions, rangeVersion)
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
