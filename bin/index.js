#!/usr/bin/env node

'use strict'

var _pkg = require('../package.json')
require('update-notifier')({pkg: _pkg}).notify()
require('meow')(_pkg)

var path = require('path')
var async = require('async')
var which = require('which')
var semver = require('semver')
var spawn = require('child_process').spawn
var nodeVersions = require('node-versions')

function processExit (code) {
  return process.exit(code || 0)
}

function nodeSwitcher (nodeVersion) {
  var binaries = {
    n: [nodeVersion],
    nvm: ['use', nodeVersion]
  }

  function switcher (binary) {
    return spawn(binary, binaries[binary], { stdio: 'inherit' })
  }

  switcher.binaries = function () { return Object.keys(binaries) }
  return switcher
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

var binaries = switcher.binaries()
var switcherBinary = null

function getBinary (next) {
  var binary = binaries.shift()
  which(binary, function (err) {
    if (!err) switcherBinary = binary
    return next()
  })
}

function whileCondition () {
  return switcherBinary != null && binaries.length !== 0
}

async.doWhilst(getBinary, whileCondition, function () {
  if (switcherBinary) return switcher(switcherBinary)
  return processExit()
})
