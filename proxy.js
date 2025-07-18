// proxy.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/tiktok/latest", async (req, res) => {
  try {
    const response = await axios.get("https://www.tiktok.com/@voltsdrops");
    const html = response.data;
    const match = html.match(/"shareLink":"(https:\/\/www\.tiktok\.com\/@voltsdrops\/video\/\d+)"/);

    if (match && match[1]) {
      res.json({ latest: match[1] });
    } else {
      res.status(404).json({ error: "Video not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
