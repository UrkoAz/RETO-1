'use strict'

/*
 * Both the parsing and generation functions use dictionaries, to translate
 * number values from individual bits to a meaning. For example, MQTT has
 * control packets which are described in 4 bits. These bits can hold up to 16
 * different values, with each having a different meaning.
 *
 * That's where dicts come into play. View the server.js file for a better example.
 */

const ctrlDict = {
  'connect': 1,
  'connack': 2,
  1: 'connect',
  2: 'connack'
}

module.exports = { ctrlDict }
