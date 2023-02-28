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

/**
 * Setup a protocol schema
 * @param {Object} schema Protocol schema
 * @returns {Object} process-ready Protocol schema
 * @public
 */
function setup (schema) {
  let offset = 0

  /*
   * If the length is and has been static until now, we can pre-create a mask,
   * therefore saving some time during parsing, which is a hot path.
   *
   * Strings indicate a variable length, which could hold any value. We cannot
   * pre-create masks for unknown lengths.
   */

  for (let key in schema) {
    const length = schema[key]['bitLength']

    if (typeof length === 'number') {
      schema[key]['mask'] = _mask(length, offset) // Pre-assign mask
      offset += length
    } else {
      break
    }
  }

  return schema
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

module.exports = setup
