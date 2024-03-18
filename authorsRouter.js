const express = require("express");
const authors = require("./authors");
const writeAuthors = require("./writeToAuthors");
const router = express.Router();
const path = require("path");

const authorsDbPath = path.join(__dirname, "db", "authors.json");

const generateAuthorId = () => {
  const randomPart = Math.random().toString(36).substr(2, 9);

  const specialChars = "!@#$%^&*():;~";
  const randomIndex = Math.floor(Math.random() * specialChars.length);
  const randomChar = specialChars[randomIndex];

  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const alphabetIndex = Math.floor(Math.random() * alphabets.length);
  const randomAlphabet = alphabets[alphabetIndex];

  return randomPart + randomChar + randomAlphabet;
};

// My authors list
const authorsArray = JSON.parse(authors());

// Create (POST)
router.post("/", (req, res) => {
  const author = {
    id: generateAuthorId(),
    ...req.body,
  };
  authorsArray.push(author);
  writeAuthors(authorsDbPath, authorsArray);
  res.status(201).json(author);
});

// Read (GET)
router.get("/", async (req, res) => {
  return res.status(200).json(authorsArray);
});

// Read single author (GET)
router.get("/:id", (req, res) => {
  const author = authorsArray.find((author) => author.id === req.params.id);
  if (!author) return res.status(404).send("Author not found");
  res.status(200).json(author);
});

// Update (PUT)
router.put("/:id", (req, res) => {
  let author = authorsArray.find((author) => author.id === req.params.id);
  if (!author) return res.status(404).send("Author not found");

  author.name = req.body.name;
  writeAuthors(authorsDbPath, authorsArray);
  res.status(200).json(author);
});

// Delete (DELETE)
router.delete("/:id", (req, res) => {
  const newAuthorsArray = authorsArray.filter(
    (author) => "/" + author.id !== req.url
  );

  writeAuthors(authorsDbPath, newAuthorsArray);
  res.status(204).json({ message: "Author deleted successfully" });
  return;
});

module.exports = router;
