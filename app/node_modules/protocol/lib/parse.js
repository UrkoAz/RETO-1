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

const unflatten = require('./unflatten')

/**
 * Transform a buffer into a readable Object, using the Protocol schema
 * @param {Buffer} buffer input
 * @param {Object} flatSchema Protocol schema
 * @returns {Object} output
 * @public
 */
function parse (buffer, flatSchema, callback) {
  let offset = 0 // Offset in bits
  const output = {} // Output object

  for (let key in flatSchema) {
    const properties = flatSchema[key] // Current key properties
    let bitLength = properties['bitLength']
    let byteLength = properties['byteLength']
    const dict = properties['dict']
    let mask = properties['mask']
    const type = properties['type']
    let result

    /* Bit handling */
    if (bitLength !== undefined) {
      if (typeof bitLength === 'string') {
        bitLength = output[bitLength]
      }

      if (mask === undefined) {
        mask = _mask(bitLength, offset)
      }

      const byteStart = Math.floor(offset / 8)
      const byteEnd = Math.ceil((offset + bitLength) / 8)
      const bits = '0x' + buffer.toString('hex', byteStart, byteEnd) // HACK
      const rightShift = (8 * byteEnd) - offset - bitLength

      result = (bits & mask) >> rightShift
      offset += bitLength

      /* Byte handling */
    } else if (byteLength !== undefined) {
      if (typeof byteLength === 'string') {
        byteLength = output[byteLength]
      }

      const encoding = properties['encoding']
      offset = Math.ceil(offset / 8) // Round to nearest full byte

      /*
       * If the encoding is undefined, we simply treat it as a Buffer. This is
       * to make it easy to forward this traffic without having to generate it
       * again.
       */

      if (encoding !== undefined) {
        result = buffer.toString(encoding, offset, offset + byteLength)
      } else {
        result = buffer.slice(offset, offset + byteLength)
      }

      offset = 8 * (offset + byteLength) // Set offset in bits again
    }

    /* Handle boolean type */
    if (type === Boolean) result = !!result

    /* Handle dict */
    if (typeof dict === 'object') {
      result = (dict[result] !== undefined) ? dict[result] : result
    }

    output[key] = result
  }

  if (typeof callback === 'function') {
    return setImmediate(() => callback(unflatten(output)))
  } else {
    return unflatten(output)
  }
}

/**
 * Generate a bitmask
 * @param {Number} length length of key in bits
 * @param {Number} offset offset in bits
 * @returns {String} bitmask
 * @private
 */
function _mask (length, offset) {
  const intOffset = offset - Math.floor(offset / 8) * 8 // Offset inside byte
  const remainder = Math.ceil((intOffset + length) / 8) * 8 - intOffset - length

  return parseInt('1'.repeat(length) + '0'.repeat(remainder), 2)
}

module.exports = parse
