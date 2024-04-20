/**
 * Convert base64 data to a Blob object.
 * @param {string} base64Data - The base64 encoded data.
 * @param {string} contentType - The content type of the data.
 * @param {number} sliceSize - The size of each slice.
 * @returns {Blob} The Blob object created from the base64 data.
 */
function getBlobFromBase64Data(base64Data, contentType, sliceSize = 512) {
  let byteCharacters;
  if (typeof window !== "undefined") {
    // Client-side
    byteCharacters = atob(base64Data);
  } else {
    // Node.js
    byteCharacters = Buffer.from(base64Data, "base64").toString("binary");
  }

  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

module.exports = { getBlobFromBase64Data };
