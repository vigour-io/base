'use strict'
var test = require('tape')
var isEmpty = require('vigour-util/is/empty')
var isRemoved = require('vigour-util/is/removed')
var Base = require('../')

test('keys', function (t) {
  var base = new Base({
    a: true,
    b: true
  })
  t.plan(6)
  t.equal(base.keys().length, 2)
  base.removeProperty(base.a, 'a')
  t.equal(base.keys().length, 1)
  base.setKey('c', true)
  t.equal(base.keys().length, 2)
  base.clear()
  t.equal(isEmpty(base), true)
  t.equal(base.keys(), false)
  base.set({ d: true })
  t.equal(base.keys().length, 1)
})

test('make references by using [ "$", "field" ] notation', function (t) {
  var base = new Base({
    field: 'something',
    other: [ '$', 'field' ]
  })
  t.plan(2)
  t.equal(base.other.__input, base.field)
  var base2 = new Base({
    field: { a: [ '$', 'field', 'b' ] }
  })
  t.equal(base2.field.a.origin, base2.field.b)
})

test('context override', function (t) {
  t.plan(1)
  var Template = new Base({
    key: 'template',
    noContextField: {
      noContext: true
    }
  }).Constructor
  var aTemplate = new Template({
    key: 'aTemplate'
  })
  t.equal(aTemplate.noContextField.path[0], 'template')
})
