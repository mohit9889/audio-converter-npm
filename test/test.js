// Import necessary modules and functions
const { convertAndSaveAudio } = require("../index");
const { readFileAsync, writeFileAsync } = require("../utils/fileOperations");
const { decodeBase64 } = require("../utils/base64");

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
  const audioFilePath = "./test/sample.aac";
  const targetFormat = "mp3";
  const outputFilePath = "./test/sample.mp3";

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it("should convert and save audio file successfully", async () => {
    // Mock audio file data, base64 data, and writeFileAsync function
    const audioFileData = Buffer.from("mocked-audio-data");
    const base64Data = "mocked-base64-data";
    const metadata = {
      name: "./test/sample", // Update expected name property to include directory path
      format: "mp3",
      data: outputFilePath,
    };

    readFileAsync.mockResolvedValue(audioFileData); // Mock readFileAsync to return audio data
    decodeBase64.mockReturnValue(base64Data); // Mock decodeBase64 to return base64 data
    writeFileAsync.mockResolvedValue(); // Mock writeFileAsync to return successful promise

    // Call the function and await the result
    const result = await convertAndSaveAudio(
      audioFilePath,
      targetFormat,
      outputFilePath
    );

    // Assert that the function returns the expected result
    expect(result).toEqual(metadata);

    // Assert that readFileAsync is called with the correct arguments
    expect(readFileAsync).toHaveBeenCalledWith(audioFilePath);

    // Assert that decodeBase64 is called with the correct arguments
    expect(decodeBase64).toHaveBeenCalledWith(audioFileData.toString("base64"));

    // Assert that writeFileAsync is called with the correct arguments
    expect(writeFileAsync).toHaveBeenCalledWith(
      outputFilePath,
      expect.any(Buffer)
    );
  });

  it("should throw an error if conversion and saving fails", async () => {
    // Mock readFileAsync to throw an error
    readFileAsync.mockRejectedValue(new Error("Failed to read file"));

    try {
      // Call the function and await the result
      await convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath);
    } catch (error) {
      // Assert that the error is thrown correctly
      expect(error.message).toBe("Failed to read file");
    }

    // Assert that readFileAsync is called with the correct arguments
    expect(readFileAsync).toHaveBeenCalledWith(audioFilePath);

    // Assert that writeFileAsync is not called
    expect(writeFileAsync).not.toHaveBeenCalled();
  });
});
