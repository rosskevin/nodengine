'use strict'

var spawn = require('child_process').spawn
var doWhilst = require('async').doWhilst
var which = require('./which')

function nvmCommand (maxSatisfyVersion, currentVersion) {
  var cmd = ''
  cmd += 'nvm install '
  cmd += maxSatisfyVersion
  if (currentVersion !== maxSatisfyVersion) {
    cmd += ' --reinstall-packages-from='
    cmd += currentVersion
  }
  return cmd
}

function createSwitcher (maxSatisfyVersion, currentVersion) {
  var binaries = {
    nvm: {
      cmd: process.env.SHELL,
      args: ['-c', 'source $NVM_DIR/nvm.sh; ' + nvmCommand(maxSatisfyVersion, currentVersion)]
    },

    n: {
      cmd: 'n',
      args: [maxSatisfyVersion]
    }
  }

  return {
    getBin: function (cb) {
      var binariesNames = Object.keys(binaries)
      var bin

      function getBin (next) {
        var binName = binariesNames.pop()
        which(binName, function (err) {
          if (!err) bin = binName
          return next()
        })
      }

      function whileCondition () {
        return !bin && binariesNames.length !== 0
      }

      doWhilst(getBin, whileCondition, function (err) {
        return cb(err, bin)
      })
    },

    spawn: function (bin) {
      bin = binaries[bin]
      return spawn(bin.cmd, bin.args, { stdio: 'inherit' })
    }
  }
}

module.exports = createSwitcher
