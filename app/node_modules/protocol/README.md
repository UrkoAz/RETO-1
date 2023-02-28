# Protocols for Node.JS [![Build Status](https://travis-ci.org/wuhkuh/protocol.svg)](https://travis-ci.org/wuhkuh/protocol) [![Greenkeeper badge](https://badges.greenkeeper.io/wuhkuh/protocol.svg)](https://greenkeeper.io/)
### Create and edit network protocols the easy way. <a href="https://github.com/feross/standard"><img align="right" src="https://cdn.rawgit.com/feross/standard/master/badge.svg"></a>

No more bitwise logic - give it a template and let it do the work for you.

  * <a href="#installation">Installation</a>
  * <a href="#example">Example</a>
  * <a href="#api">API</a>
  * <a href="#support">Supported Node versions</a>
  * <a href="#license">License</a>

<a name="installation"></a>

## Installation

```js
npm install protocol --save
```

<a name="example"></a>

## Example

```js
const Protocol = require('protocol')

const myProtocol = new Protocol({
  header: [{
    firstBit: { bitLength: 1 },
    secondBit: { bitLength: 1 }
  }],
  payloadLength: { bitLength: 4 },
  payload: { byteLength: 'payloadLength', encoding: 'utf8' } 
})

/* 
 * 0x90 is hex for '1001 0000'
 * firstBit: 1, secondBit: 0, payloadLength: 4 (bitwise 0100)
 * payload: 'abcd' (0x61 to 0x64)
 */
myProtocol.parse(Buffer.from([0x90, 0x61, 0x62, 0x63, 0x64]))

/*
 * '0 1 0010 00' to hex -> 0x48
 * 'bd' -> 0x62, 0x64
 * result: Buffer <0x48, 0x62, 0x64>
 */
myProtocol.generate({
  header: {
    firstBit: 0,
    secondBit: 1
  },
  payloadLength: 2, // this has to be set explicitly!
  payload: 'bd'
})
```
View the <a href="#api">API</a> or the <a href="https://github.com/wuhkuh/protocol/tree/master/example">example folder</a> in this project's repository for a closer look.

> Good practice:  
> Create a protocol in a separate file and share it between clients.

<a name="api"></a>

## API

* <a href="#protocol"><code>Protocol</code></a>
* <a href="#generate"><code>protocol#<b>generate()</b></code></a>
* <a href="#parse"><code>protocol#<b>parse()</b></code></a>

---
<a name="protocol"></a>

### `Protocol(schema)`

`Protocol` is the exposed class. Create it by using `new Protocol(schema)`.  
The `schema` parameter is an object with the following notation:

```js
const schema = {
  header: [{
    firstBit: { bitLength: 1 },
    secondBit: { bitLength: 1 }
  }],
  payloadLength: { bitLength: 4 },
  payload: { byteLength: 'payloadLength' }
}
```

Protocols are read in top-to-bottom order, with the input in Big Endian (network order as  
defined in <a href="https://tools.ietf.org/html/rfc1700">RFC 1700</a>). This means that a Buffer will be parsed and generated from left to right.

The current supported options are:

* `bitLength` in amount of bits, or a string that points to another key when variable. 
* `byteLength` in amount of bytes, or a string that points to another key when variable.
* `dict` as an object containing values for parsing and generating.
* `encoding` as a string containg the required <a href="https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end">encoding</a>.  
If not present, parsing returns a Buffer.
* `type` as a class, only supporting Boolean at this moment.  
This converts outputs to Booleans (all non-zeros are true).

---
<a name="generate"></a>

### `Protocol.generate(object)`

This method generates a Buffer from an Object. It starts with dictionary translation and  
type handling, followed by concatenation and outputting a single Buffer.

* `object: Object`  
Input object that shall be translated to a Buffer using a Protocol.

If there is no encoding given during generation of a Buffer, it uses UTF-8.  
If the input already contains a value of type Buffer, it will retain this Buffer.  
When a length is variable and points to key `x`, `x` does not automatically get a value assigned.  
__This has to be set explicitly!__

---
<a name="parse"></a>

### `Protocol.parse(buffer)`

This method generates an Object from a Buffer. It splits the individual bits and bytes,  
followed by type handling and dictionary translation.

* `buffer: Buffer`  
Input buffer that shall be translated to an Object using a Protocol.

If there is no encoding given during parsing of a Buffer, it will retain this Buffer.

<a name="support"></a>

## Supported Node versions

| Version  | Supported until |
| --------- | :---------------: |
| Node v7 |    2017-06-01   |
| Node v8 |    2019-12-31   |

<a name="license"></a>

## License

MIT
