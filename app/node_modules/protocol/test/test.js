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

const protocols = require('./protocols')
const test = require('tape')

test('Parsing, linear template', function (t) {
  const testPacket = Buffer.from([0x1F])
  const result = {
    header: 'correct',
    flag1: 1,
    flag2: 1,
    flag3: 3
  }

  t.deepEqual(protocols.linearProtocol.parse(testPacket), result)
  t.end()
})

test('Parsing, embedded template', function (t) {
  const testPacket = Buffer.from([0xA0])
  const result = {
    firstBits: {
      firstBit: 1,
      secondBit: 0
    },
    firstNibble: 8
  }

  t.deepEqual(protocols.embeddedProtocol.parse(testPacket), result)
  t.end()
})

test('Parsing, dynamic template', function (t) {
  const testPacket = Buffer.from([0xFF, 0x40, 0x61, 0x62, 0x63, 0x64, 0xFF])
  const result = {
    header: {
      bit1: 1,
      bit2: 3,
      bit3: 3,
      bit4: 7
    },
    payloadLength: 4,
    payload: 'abcd',
    next: 15
  }

  t.deepEqual(protocols.dynamicProtocol.parse(testPacket), result)
  t.end()
})

test('Parsing, buffer template', function (t) {
  const testPacket = Buffer.from([0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68])
  const result = {
    buffer1: 'abcd',
    buffer2: 'efgh'
  }

  t.deepEqual(protocols.bufferOnly.parse(testPacket), result)
  t.end()
})

test('Parsing asynchronously', function (t) {
  const testPacket = Buffer.from([0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68])
  const result = {
    buffer1: 'abcd',
    buffer2: 'efgh'
  }

  protocols.bufferOnly.parse(testPacket, (packet) => {
    t.deepEqual(packet, result)
    t.end()
  })
})

test('Generating, embedded template', function (t) {
  const testPacket = {
    firstBits: {
      firstBit: 1,
      secondBit: 0
    },
    firstNibble: 6
  }
  const result = Buffer.from([0x98])

  t.deepEqual(protocols.embeddedProtocol.generate(testPacket), result)
  t.end()
})

test('Generating, dynamic template', function (t) {
  const testPacket = {
    header: {
      bit1: 1,
      bit2: 2,
      bit3: 3,
      bit4: 2
    },
    payloadLength: 4,
    payload: 'abcd',
    next: 8
  }
  const result = Buffer.from([0xda, 0x40, 0x61, 0x62, 0x63, 0x64, 0x80])

  t.deepEqual(protocols.dynamicProtocol.generate(testPacket), result)
  t.end()
})

test('Generating, buffer template', function (t) {
  const testPacket = {
    buffer1: 'abcd',
    buffer2: 'efgh'
  }
  const result = Buffer.from([0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68])

  t.deepEqual(protocols.bufferOnly.generate(testPacket), result)
  t.end()
})

test('Generating asynchronously', function (t) {
  const testPacket = {
    buffer1: 'abcd',
    buffer2: 'efgh'
  }
  const result = Buffer.from([0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68])

  protocols.bufferOnly.generate(testPacket, (packet) => {
    t.deepEqual(packet, result)
    t.end()
  })
})
