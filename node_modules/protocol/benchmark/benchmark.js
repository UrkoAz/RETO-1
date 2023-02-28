/*
 * MIT License
 *
 * Copyright (c) 2017 Wouter Klijn <contact@wuhkuh.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'

const moduleMin = 300000 // Minimum for modules. Default: 300000
const protocolMin = 10000 // Minimum for protocol functions. Default: 10000

/*
 * In the above options you can set the requirements for your benchmark,
 * in case you have any.
 *
 * Benchmark.js will generate an output file in the main directory called
 * 'benchmark.log', containing the results of the benchmark. Any errors
 * during the benchmark will be sent to your console.
 */

const Benchmark = require('benchmark')
const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
const fs = require('fs')
const input = require('./input')
const modules = require('../lib')
const output = (string) => fs.appendFileSync('benchmark.log', string + '\r\n')
const protocol = require('./protocol')

console.log('Protocol starting benchmark for your system')
output('Benchmark starting at ' + date)

/* Benchmarking modules */
const moduleSuite = new Benchmark.Suite('moduleSuite')
moduleSuite.add('flatten', function () {
  modules.flatten(input.modules.flatten)
})
moduleSuite.add('flattenSchema', function () {
  modules.flattenSchema(input.modules.flattenSchema)
})
moduleSuite.add('setup', function () {
  modules.setup(input.modules.setup)
})
moduleSuite.add('unflatten', function () {
  modules.unflatten(input.modules.unflatten)
})

moduleSuite.on('start', () => output('BENCH: modules starting'))
moduleSuite.on('error', (error) => console.error(error))
moduleSuite.on('complete', () => output('BENCH: modules complete'))
moduleSuite.run()

/* Benchmarking protocol */
const protocolSuite = new Benchmark.Suite('protocolSuite')
protocolSuite.add('generate', function () {
  protocol.generate(input.protocol.generate)
})
protocolSuite.add('parse', function () {
  protocol.parse(input.protocol.parse)
})
protocolSuite.add({
  'name': 'generateAsync',
  'defer': true,
  'fn': function (deferred) {
    protocol.generate(input.protocol.generate, () => { deferred.resolve() })
  }
})
protocolSuite.add({
  'name': 'parseAsync',
  'defer': true,
  'fn': function (deferred) {
    protocol.generate(input.protocol.generate, () => { deferred.resolve() })
  }
})

protocolSuite.on('start', () => output('BENCH: protocol starting'))
protocolSuite.on('error', (error) => console.error(error))
protocolSuite.on('complete', () => output('BENCH: protocol complete'))
protocolSuite.run()

/* Writing results */
output('SCORE:')
moduleSuite.forEach(function (element) {
  let adequate = (Math.ceil(element.hz) >= moduleMin)
  let str = ((adequate) ? 'OK: ' : 'SLOW: ') + element.toString()
  output(str)
})
protocolSuite.forEach(function (element) {
  let adequate = (Math.ceil(element.hz) >= protocolMin)
  let str = ((adequate) ? 'OK: ' : 'SLOW: ') + element.toString()
  output(str)
})

output('====== EOL ======\r\n')
console.log('Benchmark complete')
