const fs = require("fs");
const axios = require("axios");

async function processURL(url) {
  //   console.log("process: ", url);
  try {
    const filename = url.split("/")[2];
    const res = await axios.get(url);
    fs.writeFile(`${filename}.txt`, res.data, "utf8", function (err, res) {
      if (err) {
        console.log("Error: ", err);
        process.exit(1);
      } else {
        console.log("Done: '" + url + "' ");
      }
    });
    // console.log(res.data.slice(0, 100));
  } catch (e) {
    console.log("Error for: '" + url + "'");
    // console.log("Error: ", e);
  }
}

function main() {
  fs.readFile("urls.txt", "utf8", async function (err, data) {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    } else {
      //   console.log(data);
      const urls = data.split("\n");
      for (let url of urls) {
        if (url) {
          processURL(url);
        }
      }
    }
  });
}

main();
