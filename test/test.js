// test/test.js
const { convertAndSaveAudio } = require("../index");
const { readFileAsync, writeFileAsync } = require("../utils/fileOperations");
const { decodeBase64 } = require("../utils/base64");

// Define sample file paths
const audioFilePath = "./test/sample.aac";
const targetFormat = "mp3";
const outputFilePath = "./test/sample.mp3";

// Mocking readFileAsync and writeFileAsync functions
jest.mock("../utils/fileOperations", () => ({
  readFileAsync: jest.fn(),
  writeFileAsync: jest.fn(),
}));

// Mocking decodeBase64 function
jest.mock("../utils/base64", () => ({
  decodeBase64: jest.fn(),
}));

describe("convertAndSaveAudio function", () => {
  // Test case for successful conversion and saving
  it("should convert and save audio file successfully", async () => {
    // Mock audio file data and base64 data
    const audioFileData = Buffer.from("mocked-audio-data");
    const base64Data = "mocked-base64-data";

    // Mock readFileAsync to return audio file data
    readFileAsync.mockResolvedValue(audioFileData);

    // Mock decodeBase64 to return base64 data
    decodeBase64.mockReturnValue(base64Data);

    // Mock writeFileAsync to return successful promise
    writeFileAsync.mockResolvedValue();

    // Call the function and await the result
    const result = await convertAndSaveAudio(
      audioFilePath,
      targetFormat,
      outputFilePath
    );

    // Assert that the function returns the expected result
    expect(result).toEqual({
      name: "./test/sample.aac",
      format: "mp3",
      data: "./test/sample.mp3",
    });

    // Assert that readFileAsync is called with the correct arguments
    expect(readFileAsync).toHaveBeenCalledWith(audioFilePath);

    // Assert that decodeBase64 is called with the correct arguments
    expect(decodeBase64).toHaveBeenCalledWith("mocked-audio-data");

    // Assert that writeFileAsync is called with the correct arguments
    expect(writeFileAsync).toHaveBeenCalledWith(
      outputFilePath,
      expect.any(Buffer)
    );
  });

  // Test case for error handling
  it("should throw an error if conversion and saving fails", async () => {
    // Mock readFileAsync to throw an error
    readFileAsync.mockRejectedValue(new Error("Failed to read file"));

    // Call the function and await the result
    await expect(
      convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath)
    ).rejects.toThrowError("Failed to read file");

    // Assert that readFileAsync is called with the correct arguments
    expect(readFileAsync).toHaveBeenCalledWith(audioFilePath);

    // Assert that writeFileAsync is not called
    expect(writeFileAsync).not.toHaveBeenCalled();
  });
});
