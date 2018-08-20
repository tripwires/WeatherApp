//http://api.openweathermap.org/data/2.5/weather?q=Mechelen&APPID=c599717a1133754dd8c523e64440fffd&units=metric

var express = require("express");
var app = express();
var request = require("request"); //add request package to the file

app.use(express.static("public")); //tells express to serve not only the view dir but also the public dir!

app.set("view engine", "ejs"); //allows us to send data to ejs templates

app.get("/", function (req, res) { //is going to be used to get the info from the user and output the wanted info
    res.render("search"); //we render a template in ejs called search
}); //= search template gets linked to the / route

//api related
app.get("/weather", function (req, res) { //this route path will match req to root /weather
    var search = (req.query.search); //we get the info from the form = via the name input tag there
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&APPID=c599717a1133754dd8c523e64440fffd&units=metric";
    //request the api
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) { //if no error and the page loads fine we continue...
            var weatherInfo = JSON.parse(body); // turn body's string format to an object
            res.render("weather", { weatherInfo: weatherInfo }); //renders the template and passes on data (all data from the body in object form) to ejs file
                                    // this allows us to pass on vars we can use in the ejs file
        }
    });
});

//starts server = tells E. to listen for req
app.listen(1337, function () {
    console.log("Server started!");
});

