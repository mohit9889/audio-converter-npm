const { convertAndSaveAudio } = require("../index");

const audioFilePath = "./test/sample.aac";
const targetFormat = "mp3";
const outputFilePath = "./test/sample.mp3";

convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath)
  .then((metadata) => {
    console.log("Audio conversion successful:", metadata);
  })
  .catch((error) => {
    console.error("Error occurred during audio conversion:", error);
  });
