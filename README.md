# audio-converter

## Description

audio-converter is a Node.js package that provides functionality to convert audio files from one format to another. It simplifies the process of converting audio files by providing a simple and intuitive API.

## Features

- Convert audio files to different formats such as MP3, WAV, AAC, etc.
- Easy-to-use API for seamless integration into your Node.js and React.js projects.
- Support for asynchronous file operations for efficient handling of large audio files.
- Proper error handling to gracefully manage exceptions during the conversion process.

## Supported Audio Formats

The audio-converter package supports the following audio format conversions:

- MP3
- WAV
- AAC
- OGG
- FLAC
- AIFF
- WMA
- M4A

## Installation

You can install the audio-converter package via npm:

```bash
npm install audio-converter
```

## Usage in Node.js

```js
const { convertAndSaveAudio } = require("audio-converter");

const audioFilePath = "path/to/input/audio.aac";
const targetFormat = "mp3";
const outputFilePath = "path/to/output/audio.mp3";

convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath)
  .then((result) => {
    console.log("Conversion successful!");
    console.log("Output File:", result.data);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
```

## Usage in React.js

```js
import React, { useState } from "react";
import { convertAndSaveAudio } from "audio-converter";

function AudioConverterComponent() {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleConvert = async () => {
    if (!audioFile) {
      alert("Please select an audio file");
      return;
    }

    try {
      const targetFormat = "mp3";
      const outputFilePath = `converted.${targetFormat}`;
      await convertAndSaveAudio(audioFile, targetFormat, outputFilePath);
      alert("Conversion successful!");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error occurred during conversion");
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
}

export default AudioConverterComponent;
```
