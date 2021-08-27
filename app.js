const { response } = require("express");
const express = require("express");
//Handling https request natively
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=COIMBATORE&appid=222c23ee23b5fbd62ddd956bee556952&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const city = weatherData.name;
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.send(
        `The temperature in ${city} is ${temperature} and has ${weatherDescription}`
      );
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
