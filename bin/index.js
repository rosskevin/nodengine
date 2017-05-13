#!/usr/bin/env node

'use strict'

require('meow')(require('../package.json'))

var semver = require('semver')
var path = require('path')

var config = require('./config')
var createSwitcher = require('./switcher')

var pkg = require(path.resolve('package.json'))
var rangeVersion = pkg.engines && pkg.engines.node

if (!rangeVersion) process.exit()

config(function (err, versions) {
  if (err) throw err

  var currentVersion = process.versions.node
  var maxSatisfyVersion = semver.maxSatisfying(versions, rangeVersion)
  var switcher = createSwitcher(maxSatisfyVersion, currentVersion)

  switcher.getBin(function (err, bin) {
    if (err) throw err
    if (bin) return switcher.spawn(bin)
  })
})
