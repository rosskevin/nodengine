'use strict'

function ensureAsync (cb, val) {
  process.nextTick(function () {
    return cb(val)
  })
}

function throwError (err) {
  console.log(err.message || err)
  return processExit(err.code)
}

function processExit (code) {
  return process.exit(code || 0)
}

module.exports = {
  ensureAsync: ensureAsync,
  throwError: throwError,
  processExit: processExit
}
