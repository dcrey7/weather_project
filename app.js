const express = require("express");
const https = require("https");
const app = express();
const bodyparser=require("body-parser");


app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");


});

app.post("/",function(req,res){

  const query=req.body.cityname;
  const apikey="1b8816c7b370afa2d2d180d1651aaabc"
  const unit="metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units=" +unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const weatherdesc = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1> the weather is like " + weatherdesc + " today.");
      res.write("<h1>the temp in "+ query +"  is: " + temp + " degree celius</h1>");
      res.write("<img src=" + imageURL + ">");
    })
  })
})





app.listen(3000, function() {
  console.log("Server is 3000");
});
