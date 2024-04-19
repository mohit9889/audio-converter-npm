/**
 * Decodes base64 data to byte characters.
 * @param {string} base64Data - Base64-encoded data.
 * @returns {string} Decoded byte characters.
 */
function decodeBase64(base64Data) {
  // Check if window.atob is available (browser environment)
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    return window.atob(base64Data);
  } else {
    // Define custom base64 decoding function (Node.js or browser environment without window.atob)
    const binaryString = atobToBinaryString(base64Data);
    return binaryString;
  }
}

/**
 * Converts a base64-encoded string to a binary string.
 * @param {string} base64Data - Base64-encoded data.
 * @returns {string} Binary string.
 */
function atobToBinaryString(base64Data) {
  // Convert base64 to binary string
  const byteCharacters = atob(base64Data);
  const binaryString = [...byteCharacters]
    .map((char) => String.fromCharCode(char.charCodeAt(0)))
    .join("");
  return binaryString;
}

module.exports = { decodeBase64 };
