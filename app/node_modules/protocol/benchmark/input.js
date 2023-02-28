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

module.exports = {
  modules: {
    flatten: { firstBits: { firstBit: 1, secondBit: 0 }, firstNibble: 6 },
    flattenSchema: {
      header: [{
        bit1: { bitLength: 1 },
        bit2: { bitLength: 2 },
        bit3: { bitLength: 2 },
        bit4: { bitLength: 3 }
      }],
      payloadLength: { bitLength: 4 },
      payload: { byteLength: 'payloadLength', encoding: 'utf8' },
      next: { bitLength: 4 }
    },
    unflatten: { 'firstBits.firstBit': 1, 'firstBits.secondBit': 0, firstNibble: 6 },
    setup: {
      'header.bit1': { bitLength: 1 },
      'header.bit2': { bitLength: 2 },
      'header.bit3': { bitLength: 2 },
      'header.bit4': { bitLength: 3 },
      payloadLength: { bitLength: 4 },
      payload: { byteLength: 'payloadLength', encoding: 'utf8' },
      next: { bitLength: 4 }
    }
  },
  protocol: {
    generate: {
      header: { bit1: 1, bit2: 2, bit3: 3, bit4: 2 },
      payloadLength: 4,
      payload: 'abcd',
      next: 8
    },
    parse: Buffer.from([0xda, 0x40, 0x61, 0x62, 0x63, 0x64, 0x80])
  }
}
