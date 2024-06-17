const express = require("express");
let axios = require("axios");
var app = express();

app.use(express.json());

app.post("/", async function (req, res, next) {
  try {
    let reqs = req.body.developers.map((devID) =>
      axios.get(`https://api.github.com/users/${devID}`)
    );
    let results = await Promise.all(reqs);
    let data = results.map((result) => ({
      name: result.data.name,
      bio: result.data.bio,
    }));
    return res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

let portNum = 3000;
console.log("listening on port: ", portNum);
app.listen(portNum);
