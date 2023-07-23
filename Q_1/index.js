const express = require("express");
const axios = require("axios");
const calculator = require("./calculate.js");
const port = 3000
const app = express();

app.get("/numbers", (req, res) => {
  let linksArr = req.query.url;
  let timeout = 420;
  if (typeof linksArr === "string") {
    linksArr = [linksArr];
  }
  if (linksArr.length <= 3) {
    timeout = 480;
  }
  let promiseArr = linksArr.map((l) =>
    axios.get(l, { timeout: timeout }).then((res) => {
      return res.data.numbers;
    })
  );
  Promise.allSettled(promiseArr).then((results1) => {
    let acceptedResults = [];
    results1.forEach((result) => {
      if (result.status === "fulfilled") {
        acceptedResults = [...acceptedResults, ...result.value];
      }
    });

    res.send(calculator(acceptedResults));
  });
});

app.listen(port, () => {
  console.log(`Server running successfully ${port}`);
});
