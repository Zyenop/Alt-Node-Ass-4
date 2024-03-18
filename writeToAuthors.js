const fs = require("fs");

const writeAuthors = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error.",
      });
    }
  });
};

module.exports = writeAuthors;
