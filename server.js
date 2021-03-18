const express = require("express");
const { example } = require("./example");
const app = express();

const port = 9000;

app.use(express.json());

app.post("/example", async (req, res) => {
  const { action, payload } = await req.body;
  const value = await example(action, payload);
  console.log("RESPONSE: " + value);
  res.send(value);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
