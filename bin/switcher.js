'use strict'

var spawn = require('child_process').spawn

function Switcher (version) {
  var binArgs = {
    n: ['n', version],
    nvm: [process.env.SHELL, '-c', 'source $NVM_DIR/nvm.sh; nvm use ' + version]
  }

  function switcher (bin) {
    var args = binArgs[bin]
    bin = args.shift()
    return spawn(bin, args, { stdio: 'inherit' })
  }

  switcher.binaries = Object.keys(binArgs)
  return switcher
}

module.exports = Switcher
