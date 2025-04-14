const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

const urlDatabase = {};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

app.post("/api/shorten", (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = generateShortCode();
  urlDatabase[shortCode] = longUrl;
  res.json({
    shortUrl: `${req.protocol}://${req.get("host")}/short/${shortCode}`
  });
});

app.get("/short/:code", (req, res) => {
  const code = req.params.code;
  const longUrl = urlDatabase[code];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found!");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
