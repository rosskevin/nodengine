#!/usr/bin/env node

'use strict'

var path = require('path')
var fs = require('fs')

require('meow')({
  pkg: require(path.resolve(__dirname, '../package.json')),
  help: fs.readFileSync(path.resolve(__dirname, './help.txt'), 'utf8')
})

var pkgPath = path.resolve('package.json')
var pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {}
var nodeVersion = pkg.engines && pkg.engines.node

!nodeVersion ? process.exit() : require('./switch')(nodeVersion)
