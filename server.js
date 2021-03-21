const express = require("express");
const { example } = require("./example");
const app = express();
const cors = require("cors");

const port = 9000;

app.use(cors());
app.use(express.json());

app.post("/example", async (req, res) => {
  console.log(await req.body);
  const { action, payload } = await req.body;
  const value = await example(action, payload);
  console.log("RESPONSE: " + value);
  const body = {
    value: value,
  };
  res.json(body);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
