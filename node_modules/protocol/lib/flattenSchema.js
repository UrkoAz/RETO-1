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
 * Flatten an Object-Array tree
 * @param {Object} schema Object-Array-type tree
 * @returns {Object} flattened Object
 * @private
 */
function _flattenSchema (schema) {
  const tree = {}

  for (let key of Object.keys(schema)) {
    const current = schema[key]

    /* Flatten Object-Arrays */
    if (current instanceof Array) {
      const arrayObj = _flattenSchema(current[0])

      for (let arrayKey of Object.keys(arrayObj)) {
        tree[key + '.' + arrayKey] = arrayObj[arrayKey]
      }

    /* Return object values */
    } else if (current instanceof Object) {
      tree[key] = current

    /* Throw an error when unexpected things happen */
    } else {
      throw new Error('unsupported input')
    }
  }

  return tree
}

/**
 * Flatten an Object-Array tree
 * @param {Object} schema Object-Array-type tree
 * @returns {Object} flattened Object
 * @public
 */
module.exports = function (schema) {
  if (schema === undefined) return undefined
  return _flattenSchema(schema)
}
