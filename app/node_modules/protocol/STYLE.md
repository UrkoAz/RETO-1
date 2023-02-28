# Common Style Guide for Node.JS (First draft, WIP)
To keep this repository clean, the Common Style Guide has been created.  
This should prevent ambiguity during commits, with the notorious bikeshedding.

## 1. General
- American English should be enforced.
- The English abbrevation rules should be followed.  
When unsure, they can be looked up on [Merriam-Webster](https://www.merriam-webster.com/).
- A line of code should not exceed 80 characters, capitalized and/or non-capitalized.  
This includes spaces and tabs, as well as commented characters.

## 2. Code
- Code should conform to the latest version of [Standard](https://github.com/feross/standard).
- Code should support current Node.JS releases.  
For more info, visit the [Node.JS LTS schedule](https://github.com/nodejs/LTS).
- When possible, code should be conform to the latest ECMAScript version.  
This is only possible if the current Node.JS releases support this.  
- Variables should have names which are easy to understand.
- Blocks of code that are not documented in the API should be private.
- A `return` statement should have an empty line before it,  
__unless__ this entire block of code is smaller than three lines long.

## 3. Documentation and notes
- [JSDoc](https://github.com/jsdoc3/jsdoc) should be used to document the code.
- JSDoc documentation should not have a blank line after it.
- When writing notes for blocks of code, use the `/* */`-notation.
- Only use the `//`-notation in-line, after a line of code.
- Use the tags `HACK` and `TODO` when necessary. Add isues to the issue tracker when doing so.

---
## TODO:
- Testing
- Error handling