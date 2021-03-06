'use strict'
const addFilters = require('./filters').add
const sortAdd = require('./sort/add')
const instances = require('./instances')

module.exports = function (key, target) {
  var sort, sIndex
  var keys = this._keys
  if ('sort' in this) {
    sort = this.sort
  }
  if (!this._ownKeys) {
    if (keys) {
      this._keys = keys.concat([ key ])
      if (sort) { this._keys._ = keys._.concat() }
      keys = this._keys
    } else {
      keys = this._keys = [ key ]
    }
    this._filters = false
    this._ownKeys = true
  } else {
    if (!keys) {
      keys = this._keys = [ key ]
    } else {
      keys.push(key)
    }
  }
  if (sort) {
    sIndex = sortAdd(this, target, keys, sort)
  }
  if (this._filters) {
    addFilters(this, key, sIndex)
  }
  instances(this, target, this.addKey, keys, key)
}
