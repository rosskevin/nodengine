'use strict'

var spawn = require('child_process').spawn

function nvmCommand (maxSatisfyVersion, rangeVersion) {
  var cmd = ''
  cmd += 'nvm install '
  cmd += maxSatisfyVersion
  cmd += ' --reinstall-packages-from='
  cmd += rangeVersion
  return cmd
}

function createSwitcher (maxSatisfyVersion, rangeVersion) {
  var binaries = {
    nvm: {
      cmd: process.env.SHELL,
      args: ['-c', 'source $NVM_DIR/nvm.sh; ' + nvmCommand(maxSatisfyVersion, rangeVersion)]
    },

    n: {
      cmd: 'n',
      args: [maxSatisfyVersion]
    }
  }

  function switcher (bin) {
    bin = binaries[bin]
    return spawn(bin.cmd, bin.args, { stdio: 'inherit' })
  }

  switcher.binaries = Object.keys(binaries)
  return switcher
}

module.exports = createSwitcher
