const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000 ;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const gifName = req.body.gifname;
  const apiKey = "ZswlfvjbDMuM9lp3y0RQoklRY4KamZ8Y";
  const limit = 10;
  const url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + gifName + "&limit=" + limit;

  https.get(url, function (response) {
    let data = "";
    response.on("data", function (chunk) {
      data = data + chunk;
    });

    response.on("end", function () {
        const gifData = JSON.parse(data);
        const gifs = [];

        for(let i = 0; i < limit; i++) {
          let gifUrl = gifData.data[i].images.original.webp;
          gifs.push("<img src=" + gifUrl + ">");
        }
        res.write("<button><a href='/'>Search Again</a></button><br>")
        res.write(gifs.join()); // To concatenate all the strings/url into a single string 
        res.send();
      });
    });
});

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});
