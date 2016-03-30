'use strict'
const test = require('tape')
const Base = require('../')
// const perf = require('vigour-performance').run

test('path', function (t) {
  t.plan(3)
  var base = new Base({ a: { b: { c: true } } })
  t.deepEqual(base.a.b.c.path(), ['a', 'b', 'c'], 'path')
  t.deepEqual(base.a.b.c.realPath(), ['a', 'b', 'c'], 'realPath')
  t.deepEqual(base.a.b.c.realPath(base.a), ['b', 'c'], 'realPath with limit')
})

test('context-path', function (t) {
  t.plan(2)
  var base = new Base({ a: { b: { c: true } } })
  var instance = new base.Constructor({ key: 'instance' })
  t.deepEqual(instance.a.b.c.path(), ['instance', 'a', 'b', 'c'], 'context-path')
  t.deepEqual(base.a.b.c.path(), ['a', 'b', 'c'], 'normal')
})
