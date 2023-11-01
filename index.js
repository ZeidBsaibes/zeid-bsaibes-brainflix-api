const express = require("express");
const crypto = require("crypto");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));

console.log(PORT);

app.listen(`${PORT}`, () => {
  console.log(`from index.js, listening on port ${PORT}`);
});

app.get("/videos", (req, res) => {
  try {
    const videosArray = JSON.parse(fs.readFileSync("./data/videos.json"));
    const videosArraySelectedKeys = videosArray.map(
      ({ id, title, channel, image }) => {
        return {
          id,
          title,
          channel,
          image,
        };
      }
    );
    console.log(`/videos get requested`);
    res.status(200).send(videosArraySelectedKeys);
  } catch (error) {
    res.status(500).send(`something went wrong, have a look at this ${error}`);
    console.error(error);
  }
});

app.get("/videos/:id", (req, res) => {
  try {
    const videosArray = JSON.parse(fs.readFileSync("./data/videos.json"));
    const requestedVideoId = req.params.id;
    console.log(`/ videos/id get request`);
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
    const {
      title,
      channel,
      image,
      description,
      views,
      likes,
      duration,
      video,
    } = req.body;

    const errors = [];

    if (!title) {
      errors.push({ message: "missing title " });
    }
    if (!channel) {
      errors.push({ message: "missing channel" });
    }
    if (!image) {
      errors.push({ message: "missing image URL" });
    }
    if (!description) {
      errors.push({ message: "missing video description" });
    }
    if (!views) {
      errors.push({ message: "no views number" });
    }
    if (!likes) {
      errors.push({ message: "no likes number" });
    }
    if (!duration) {
      errors.push({ message: "no duration information" });
    }
    if (!video) {
      errors.push({ message: "no video URL" });
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    const newVideo = {
      id: crypto.randomUUID(),
      title: title,
      channel: channel,
      image: image,
      description: description,
      views: views,
      likes: likes,
      duration: duration,
      video: video,
      timestamp: Date.now(),
      comments: [],
    };
    // console.log(`this is the new video`, newVideo);

    const videosArray = JSON.parse(fs.readFileSync("./data/videos.json"));

    videosArray.push(newVideo);
    console.log(videosArray);

    // fs.writeFileSync("./data/videos.json", JSON.stringify(videosArray));

    res.status(201).send(newVideo);
  } catch (error) {
    console.error(error);
  }
});

// serve static images
