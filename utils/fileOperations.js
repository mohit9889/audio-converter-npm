let readFileAsync;
let writeFileAsync;

// Check if FileReader is defined (browser environment)
if (typeof FileReader !== "undefined") {
  // FileReader is available, define readFileAsync using FileReader
  readFileAsync = function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Set up onload event handler
      reader.onload = () => {
        resolve(reader.result); // Resolve the promise with the result (file data)
      };

      // Set up onerror event handler
      reader.onerror = () => {
        reject(reader.error); // Reject the promise with the error
      };

      // Read the file as data URL
      reader.readAsDataURL(file);
    });
  };

  // Define writeFileAsync for browser environment
  writeFileAsync = function (data, fileName) {
    return new Promise((resolve, reject) => {
      // Create a Blob object from the data
      const blob = new Blob([data]);

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create an anchor element to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;

      // Programmatically trigger click event to start download
      a.click();

      // Cleanup by revoking URL
      URL.revokeObjectURL(url);

      // Resolve the promise
      resolve();
    });
  };
} else {
  // FileReader is not available (Node.js environment), use fs module
  const { promisify } = require("util");
  const fs = require("fs");
  readFileAsync = promisify(fs.readFile);
  writeFileAsync = promisify(fs.writeFile);
}

module.exports = { readFileAsync, writeFileAsync };
