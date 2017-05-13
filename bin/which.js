'use strict'

var _which = require('which')
var NVM_DIR = process.env.NVM_DIR

function which (bin, cb) {
  var binaries = {
    n: function () { return _which(bin, cb) },
    nvm: function () { return cb(NVM_DIR ? null : 'nope') }
  }

  return binaries[bin]()
}

module.exports = which
