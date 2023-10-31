const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const fs = require("fs");

console.log(PORT);

app.listen(`${PORT}`, () => {
  console.log(`from index.js, listening on port ${PORT}`);
});

app.get("/videos", (req, res) => {
  try {
    const videosArray = fs.readFileSync("./data/videos.json");
    res.status(200).send(videosArray);
  } catch (error) {
    res.status(500).send(`something went wrong, have a look at this ${error}`);
    console.error(error);
  }
});

app.get("/videos/:id", (req, res) => {
  try {
    const videosArray = JSON.parse(fs.readFileSync("./data/videos.json"));
    const requestedVideoId = req.params.id;
    const foundVideo = videosArray.find((video) => {
      return video.id === requestedVideoId;
    });
    if (!foundVideo) {
      return res.status(404).send({
        error: {
          code: "RESOURCE_NOT_FOUND",
          message: "No video with that id exists",
        },
      });
    } else if (foundVideo) {
      return res.status(200).send(foundVideo);
    }

    res.send(foundVideo);
  } catch (error) {
    res.status(500).send(`something went wrong, have a look at this ${error}`);
  }
});

app.post("/videos", (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
});
