'use strict'

function ensureAsync (cb, value) {
  process.nextTick(function () {
    return cb(value)
  })
}

module.exports = ensureAsync
