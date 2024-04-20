const { convertAndSaveAudio } = require("../index");

// Paths and target format for audio conversion
const audioFilePath = "./test/sample.aac"; // Path to the original audio file
const targetFormat = "mp3"; // Target format for conversion
const outputFilePath = "./test/sample.mp3"; // Path to save the converted audio file

// Convert and save audio
convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath)
  .then((metadata) => {
    // Log metadata upon successful conversion
    console.log("Audio conversion successful:", metadata);
  })
  .catch((error) => {
    // Log error if conversion fails
    console.error("Error occurred during audio conversion:", error);
  });
