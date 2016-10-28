#!/usr/bin/env node

'use strict'

require('meow')(require('../package.json'))

var path = require('path')
var semver = require('semver')
var doWhilst = require('async').doWhilst

var which = require('./which')
var config = require('./config')
var createSwitcher = require('./switcher')
var processExit = require('./util/process-exit')

var pkg = require(path.resolve('package.json'))
var rangeVersion = pkg.engines && pkg.engines.node

if (!rangeVersion) processExit()

config(function (versions) {
  var currentVersion = process.versions.node
  var maxSatisfyVersion = semver.maxSatisfying(versions, rangeVersion)
  var switcher = createSwitcher(maxSatisfyVersion, currentVersion)
  var switcherBin

  function getBin (next) {
    var bin = switcher.binaries.pop()
    which(bin, function (err) {
      if (!err) switcherBin = bin
      return next()
    })
  }

  function whileCondition () {
    return !switcherBin && switcher.binaries.length !== 0
  }

  doWhilst(getBin, whileCondition, function () {
    if (switcherBin) return switcher(switcherBin)
  })
})
