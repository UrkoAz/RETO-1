'use strict'

const dicts = require('./dicts')
const Protocol = require('protocol')

/*
 * This is where your protocol is defined. This example protocol consists of
 * four bits that are sent back and forth between the server and the client.
 *
 * The ctrlDict gives meaning to the values of these four bits. Check both
 * server.js and dicts.js for more clarity on using this protocol.
 */

const ctrlDict = dicts.ctrlDict
const testProto = new Protocol({
  control: { bitLength: 4, dict: ctrlDict }
})

module.exports = testProto
