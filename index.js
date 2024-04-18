const { readFileAsync, writeFileAsync } = require("./utils/fileOperations");
const { decodeBase64 } = require("./utils/base64");

/**
 * Converts an audio file to the specified target format and saves it to the output file.
 * @param {string} audioFilePath - Path to the input audio file.
 * @param {string} targetFormat - Desired target audio format (e.g., 'mp3', 'wav').
 * @param {string} outputFilePath - Path to save the converted audio file.
 * @returns {Promise<Object>} A Promise that resolves to an object containing metadata about the converted audio.
 */
async function convertAndSaveAudio(
  audioFilePath,
  targetFormat,
  outputFilePath
) {
  try {
    // Convert target format to lowercase for consistency
    const targetFormatLower = targetFormat.toLowerCase();

    // Read the audio file asynchronously and get the buffer data
    const audioFileData = await readFileAsync(audioFilePath);

    // Convert audio buffer data to base64 format
    const base64Data = audioFileData.toString("base64");

    // Determine the content type based on the target format
    const contentType = `audio/${targetFormatLower}`;

    // Create a Blob object from base64 data with specified content type
    const blob = getBlobFromBase64Data(base64Data, contentType);

    // Write the Blob object to a file
    await writeFileAsync(outputFilePath, blob);

    // Extract the audio file name without extension
    const audioFileName = audioFilePath.substring(
      0,
      audioFilePath.lastIndexOf(".")
    );

    // Return metadata about the converted audio
    return {
      name: audioFileName,
      format: targetFormatLower,
      data: outputFilePath,
    };
  } catch (error) {
    // Handle errors during conversion and saving process
    console.error("Error occurred while converting and saving audio:", error);
    throw error;
  }
}

/**
 * Creates a Blob object from base64 data.
 * @param {string} base64Data - Base64-encoded audio data.
 * @param {number} sliceSize - Size of each byte slice.
 * @returns {Buffer} The Blob object representing the audio data.
 */
function getBlobFromBase64Data(base64Data, sliceSize = 512) {
  const byteCharacters = decodeBase64(base64Data);
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

  return Buffer.concat(byteArrays);
}

module.exports = { convertAndSaveAudio };
