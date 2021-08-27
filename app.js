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
      const icon = weatherData.weather[0].icon;
      const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<h1>The temperature in ${city} is ${temperature}</h1>`);
      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write(`<img src=${imgUrl} >`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
