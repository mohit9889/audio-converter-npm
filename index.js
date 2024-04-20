const { getBlobFromBase64Data } = require("./utils/blob-utils");
const { readFile, writeFile } = require("./utils/fs-utils");

/**
 * Converts audio file data to the target format and optionally saves it to a file.
 * @param {File|string} audioFileData - The audio file data to convert. Can be a File object in the browser or a file path in Node.js.
 * @param {string} targetFormat - The target format to convert to.
 * @param {string} [outputFilePath] - The path where the converted audio file will be saved. Applicable only in Node.js environment.
 * @returns {Promise<{ name: string, format: string, data: string, contentType: string }>} A promise that resolves with the converted audio data.
 */
async function convertAndSaveAudio(
  audioFileData,
  targetFormat,
  outputFilePath,
  onProgress
) {
  try {
    // Ensure lowercase target format
    targetFormat = targetFormat.toLowerCase();
    const contentType = "audio/" + targetFormat;

    let blobUrl;

    if (typeof window !== "undefined") {
      // Client-side (browser environment)
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onprogress = function (event) {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress); // Report progress to the provided callback
          }
        };
        reader.onload = function (event) {
          // Splitting base64 data
          const data = event.target.result.split(",");
          const base64Data = data[1];
          // Creating blob from base64 data
          const blob = getBlobFromBase64Data(base64Data, contentType);
          blobUrl = URL.createObjectURL(blob);
          // Extracting audio file name
          const audioFileName = audioFileData.name.substring(
            0,
            audioFileData.name.lastIndexOf(".")
          );

          resolve({
            name: audioFileName,
            format: targetFormat,
            data: blobUrl,
            contentType,
          });
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.readAsDataURL(audioFileData);
      });
    } else {
      // Node.js environment
      const data = await readFile(audioFileData);
      const base64Data = data.toString("base64");

      if (outputFilePath) {
        // Write base64 data to file
        await writeFile(outputFilePath, Buffer.from(base64Data, "base64"));
      }

      blobUrl = outputFilePath;
      // Extracting audio file name
      const audioFileName = audioFileData.split("/").pop().split(".")[0];

      return {
        name: audioFileName,
        format: targetFormat,
        data: blobUrl,
        contentType,
      };
    }
  } catch (error) {
    console.error("Error occurred during audio conversion:", error);
    throw error;
  }
}

module.exports = { convertAndSaveAudio };
