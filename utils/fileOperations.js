const { promisify } = require("util");
const fs = require("fs");

// Promisify file system functions for asynchronous operations
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

module.exports = { readFileAsync, writeFileAsync };
