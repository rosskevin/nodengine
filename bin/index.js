#!/usr/bin/env node

'use strict'

var _pkg = require('../package.json')
require('update-notifier')({pkg: _pkg}).notify()
require('meow')(_pkg)

var path = require('path')
var which = require('which')
var semver = require('semver')
var eachAsync = require('each-async')
var spawn = require('child_process').spawn
var nodeVersions = require('node-versions')

function processExit (code) {
  return process.exit(code || 0)
}

function nodeSwitcher (nodeVersion) {
  var binaries = {
    n: [nodeVersion]
  }

  function swicher (binary) {
    return spawn(binary, binaries[binary], {stdio: 'inherit'})
  }

  swicher.binaries = Object.keys(binaries)
  return swicher
}

var pkg

try {
  pkg = require(path.resolve('package.json'))
} catch (err) {
  processExit()
}

var nodeVersion = pkg.engines && pkg.engines.node
if (!nodeVersion) processExit()

var maxNodeVersion = semver.maxSatisfying(nodeVersions, nodeVersion)
var switcher = nodeSwitcher(maxNodeVersion)
var binaries = []

eachAsync(switcher.binaries, function (binary, index, next) {
  which(binary, function (err) {
    if (!err) binaries.push(binary)
    return next()
  })
}, function () {
  if (binaries.length) return switcher(binaries.shift())
})
