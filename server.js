const express = require("express");
const authorsRouter = require("./authorsRouter");
const logger = require("./logger");

const app = express();
const port = 5000;

app.use(express.json());
app.use(logger);

app.use("/authors", authorsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
