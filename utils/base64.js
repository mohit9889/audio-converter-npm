const { atob } = require("atob");

/**
 * Decodes base64 data to byte characters.
 * @param {string} base64Data - Base64-encoded data.
 * @returns {string} Decoded byte characters.
 */
function decodeBase64(base64Data) {
  return atob(base64Data);
}

module.exports = { decodeBase64 };
