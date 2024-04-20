// ./utils/fs-utils.js

let fs;

if (typeof window === "undefined") {
  // Node.js
  fs = require("fs");
}

/**
 * Read file from given path.
 * @param {string} filePath - The path of the file to read.
 * @returns {Promise<Buffer|string>} A promise that resolves with the file data.
 */
function readFile(filePath) {
  if (typeof window !== "undefined") {
    // Client-side
    return new Promise((resolve, reject) => {
      fetch(filePath)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const bytes = new Uint8Array(buffer);
          const binary = bytes.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          );
          resolve(binary);
        })
        .catch((error) => reject(error));
    });
  } else {
    // Node.js
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
}

/**
 * Write data to a file.
 * @param {string} filePath - The path of the file to write to.
 * @param {Buffer|string} data - The data to write to the file.
 * @returns {Promise<void>} A promise that resolves when the write operation is complete.
 */
function writeFile(filePath, data) {
  if (typeof window !== "undefined") {
    // Client-side
    return fetch(filePath, {
      method: "PUT",
      body: data,
    }).then(() => {});
  } else {
    // Node.js
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
}

module.exports = { readFile, writeFile };
