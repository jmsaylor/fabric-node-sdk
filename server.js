const express = require("express");
const { query } = require("./main");
const app = express();

const port = 9000;

app.post("/", async (req, res) => {
  const { id } = req;
  const value = await query();
  console.log("RESPONSE: " + value);
  res.send(value);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
