'use strict'

var FIVE_DAYS = 1000 * 60 * 60 * 24 * 5
var pkg = require('../package.json')

require('update-notifier')({pkg: pkg}).notify()

var Configstore = require('configstore')
var configName = 'update-notifier-' + pkg.name

var config = new Configstore(configName, {
  nodeVersions: []
})

var lastFetchCheck = config.get('lastFetchCheck')
var now = Date.now()
var fetchCheckInterval = process.env.NODENGINE_INTERVAL || FIVE_DAYS
var isCacheValid = now - lastFetchCheck < fetchCheckInterval

var nodeVersions = config.get('nodeVersions')
var hasVersions = nodeVersions.length

function loadConfig (cb) {
  if (hasVersions && isCacheValid) return cb(nodeVersions)
  require('./fetch')(function (err, nodeVersions) {
    if (err) {
      if (hasVersions) return cb(nodeVersions)
      throw err
    }
    config.set('nodeVersions', nodeVersions)
    config.set('lastFetchCheck', Date.now())
    return cb(nodeVersions)
  })
}

module.exports = loadConfig
