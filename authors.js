const fs = require("fs");
const path = require("path");

const authorsDbPath = path.join(__dirname, "db", "authors.json");

const authors = (req, res) => {
  const authorsList = fs.readFileSync(authorsDbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return JSON.parse(data);
  });

  return authorsList;
};

module.exports = authors;
