const fs = require("fs");
/**
 * Read file from given path (Node.js only).
 * @param {string} filePath - The path of the file to read.
 * @returns {Promise<Buffer>} A promise that resolves with the file data.
 */
async function readFile(filePath) {
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

/**
 * Write data to a file.
 * @param {string} filePath - The path of the file to write to.
 * @param {Buffer|string} data - The data to write to the file.
 * @returns {Promise<void>} A promise that resolves when the write operation is complete.
 */
function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { readFile, writeFile };
