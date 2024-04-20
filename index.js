const { getBlobFromBase64Data } = require("./utils/blob-utils");
const { readFile, writeFile } = require("./utils/fs-utils");

/**
 * Convert audio file data to the target format and save it to a file.
 * @param {string} audioFilePath - The path to the audio file to convert.
 * @param {string} targetFormat - The target format to convert to.
 * @param {string} outputFilePath - The path where the converted audio file will be saved.
 * @returns {Promise<string>} A promise that resolves with the path of the converted audio file.
 */
async function convertAndSaveAudio(
  audioFilePath,
  targetFormat,
  outputFilePath
) {
  try {
    targetFormat = targetFormat.toLowerCase();

    const data = await readFile(audioFilePath);
    const contentType = "audio/" + targetFormat;
    const base64Data = data.toString("base64");
    const blob = getBlobFromBase64Data(base64Data, contentType);

    const buffer = await blob.arrayBuffer();
    await writeFile(outputFilePath, Buffer.from(buffer));
    const audioFileName = audioFilePath.substring(
      audioFilePath.lastIndexOf("/") + 1,
      audioFilePath.lastIndexOf(".")
    );

    return {
      name: audioFileName,
      format: targetFormat,
      contentType,
      data: outputFilePath,
    };
  } catch (error) {
    console.log("Error occurred while converting : ", error);
    throw error;
  }
}

module.exports = { convertAndSaveAudio };
