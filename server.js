const express = require("express");
const { main } = require("./main");
const app = express();

const port = 9000;

app.use(express.json());

app.post("/", async (req, res) => {
  const { action, payload } = await req.body;
  const value = await main(action, payload);
  console.log("RESPONSE: " + value);
  res.send(value);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
