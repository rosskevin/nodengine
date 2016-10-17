#!/usr/bin/env node

'use strict'

var _pkg = require('../package.json')
require('meow')(_pkg)
var config = require('./config')

var path = require('path')
var async = require('async')
var semver = require('semver')
var which = require('./which')
var Switcher = require('./switcher')

var processExit = require('./util').processExit

var pkg

try {
  pkg = require(path.resolve('package.json'))
} catch (err) {
  processExit()
}

var nodeVersion = pkg.engines && pkg.engines.node
if (!nodeVersion) processExit()

config(function (nodeVersions) {
  var maxNodeVersion = semver.maxSatisfying(nodeVersions, nodeVersion)

  var switcher = Switcher(maxNodeVersion, nodeVersion)
  var switcherBin = null

  function getBin (next) {
    var bin = switcher.binaries.pop()
    which(bin, function (err) {
      if (!err) switcherBin = bin
      return next()
    })
  }

  function whileCondition () {
    return switcherBin == null && switcher.binaries.length !== 0
  }

  async.doWhilst(getBin, whileCondition, function () {
    if (switcherBin) return switcher(switcherBin)
  })
})
