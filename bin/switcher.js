'use strict'

var spawn = require('child_process').spawn

function Switcher (version) {
  var binaries = {
    nvm: {
      cmd: version
    },

    n: {
      cmd: 'n',
      args: [version]
    }
  }

  function switcher (versionManager) {
    var bin = binaries[versionManager]
    if(versionManager === 'nvm'){

      // shoot this to stdout and let the caller run:
      //  V=`nodengine` && nvm install $V
      console.log(bin.cmd)
    }
    else{
      return spawn(bin.cmd, bin.args, { stdio: 'inherit' })
    }
  }

  switcher.binaries = Object.keys(binaries)
  return switcher
}

module.exports = Switcher
