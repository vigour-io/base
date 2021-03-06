'use strict'
const Base = require('../../base')
const test = require('brisky-performance')
var amount = 1e4
var hri = require('human-readable-ids').hri
var obj = {}
for (var i = 0; i < amount; i++) {
  obj[hri.random()] = {
    index: i
  }
}

const SpecialBase = Base({
  properties: { index: true }
}).Constructor

function createSpecialBase () {
  for (var i = 0; i < amount * 2; i++) {
    new SpecialBase(i) // eslint-disable-line
  }
}

function property () {
  new SpecialBase(obj) // eslint-disable-line
}

test(property, createSpecialBase, 10)
