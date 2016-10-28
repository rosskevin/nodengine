'use strict'

function processExit (code) {
  return process.exit(code || 0)
}

module.exports = processExit
