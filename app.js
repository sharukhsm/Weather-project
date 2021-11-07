const { response } = require("express");
const express = require("express");
//Handling https request natively
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const query = "Coimbatore";
  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const unit = "metric";
  //First try running without react and check if api call works. If it doesn't work, Install react torg make this app work, cuz we added .env, which only works on react.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=222c23ee23b5fbd62ddd956bee556952&units=${unit}`;
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
