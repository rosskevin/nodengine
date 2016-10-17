'use strict'

var spawn = require('child_process').spawn

function Switcher (version, currentVersion) {
  var installCmd = 'nvm install ' + version
  installCmd += (currentVersion) ? ' --reinstall-packages-from=' + currentVersion : ''

  var binaries = {
    nvm: {
      cmd: process.env.SHELL,
      args: ['-c', 'source $NVM_DIR/nvm.sh; ' + installCmd]
    },

    n: {
      cmd: 'n',
      args: [version]
    }
  }

  function switcher (bin) {
    bin = binaries[bin]
    return spawn(bin.cmd, bin.args, { stdio: 'inherit' })
  }

  switcher.binaries = Object.keys(binaries)
  return switcher
}

module.exports = Switcher
