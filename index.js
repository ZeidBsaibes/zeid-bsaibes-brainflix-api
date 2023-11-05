const express = require("express");
const crypto = require("crypto");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const fs = require("fs");
const cors = require("cors");

const videos = require("./routes/videos");
app.use(express.json());

app.use("/videos", videos);

// need to add all  images and server from the backend
app.use(cors());
app.use("/public", express.static("public"));

console.log(PORT);

app.listen(`${PORT}`, () => {
  console.log(`from index.js, listening on port ${PORT}`);
});

// app.get("/videos/:id", (req, res) => {
//   try {
//     const videosArray = JSON.parse(fs.readFileSync("./data/videos.json"));
//     const requestedVideoId = req.params.id;
//     console.log(`/ videos/id get request`);
//     const foundVideo = videosArray.find((video) => {
//       return video.id === requestedVideoId;
//     });
//     if (!foundVideo) {
//       return res.status(404).send({
//         error: {
//           code: "RESOURCE_NOT_FOUND",
//           message: "No video with that id exists",
//         },
//       });
//     } else if (foundVideo) {
//       return res.status(200).send(foundVideo);
//     }

//     res.send(foundVideo);
//   } catch (error) {
//     res.status(500).send(`something went wrong, have a look at this ${error}`);
//   }
// });

// serve static images
