$( document ).ready(function() {

    var cities = [];

// general function to call the different APIs
    function retrieveCityInfo(cityValue) {

// variables for the current weather API
        var APIKey = "186950d5261992f795f01a481c7fd390";
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIKey + "&units=imperial";
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityValue + "&appid=" + APIKey + "&units=imperial";
        var date = moment().format("LL");

// current weather API
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
      }).then(function(response) {

// each variable is declared and then dynamically added to HTML
     var cityName = $("#city-name").text(response.name + " | " + date);
    //  $("#current-conditions").show();
     $("#current-conditions").show().append(cityName);

     var icon = $("#icon").attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png");
     $("#current-conditions").append(icon);

     var temperature = $("#temperature").text("Temperature: " + response.main.temp + "°F");
     temperature.css({"list-style": "none", "font-size": "20px"});
     $("#current-conditions").append(temperature);

     var humidity = $("#humidity").text("Humidity: " + response.main.humidity);
     humidity.css({"list-style": "none", "font-size": "20px"});
     $("#current-conditions").append(humidity);

     var windSpeed = $("#wind-speed").text("Wind Speed: " + response.wind.speed);
     windSpeed.css({"list-style": "none", "font-size": "20px"});
     $("#current-conditions").append(windSpeed);

// UVI API within the Current Weather API in order to access lat & lon
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uviQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey; 

        $.ajax({
            url: uviQueryURL,
            method: "GET"
          }).then(function(response) {

// UVI div selected and added to HTML with content
            var uvi = $("#uv-index").text("UV Index: " + response.value);
            uvi.css({"list-style": "none", "font-size": "20px"});
            $("#current-conditions").append(uvi);

// if else statement to dictate color of UVI based on intensity 
            if (response.value < 2) {
                $(uvi).css("color", "#00e600");
            } 
            else if (response.value > 2 && response.value < 6) {
                $(uvi).css("color", "#f5e600");
            } 
            else if (response.value > 6 && response.value < 8) {
                $(uvi).css("color", "#ff6f00");
            }
            else if (response.value > 8) {
                $(uvi).css("color", "#f11000");
            }
        });
    });

// new function to render 5 day forecast
    function day5Forecast() {

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
      }).then(function(response) {

// variables to access each day within array, as well as new array to hold days
        var day1 = response.list[5];
        var day2 = response.list[13];
        var day3 = response.list[21];
        var day4 = response.list[29];
        var day5 = response.list[37];
        var days = [day1, day2, day3, day4, day5];

// using .empty to clear out the div when calling on a new city
        $(".forecast-div").empty();
        $("#day-forecast-header").show();

// for loop to add cards for each day in array
        for (var i = 0; i < days.length; i++) {

// create div container and add to HTML
            var d = $("<div></div>");
            d.addClass("card");
            d.css({"background-color":"#015292", "color":"white", "text-align": "center", "border-style": "solid", "padding": "20px", "display":"inline-block", "margin":"10px"});
            d.width("12rem");
            $(".forecast-div").append(d);

// create header and add date of specified city; .slice to select only the first 10 characters; added to HTML
            var t = $("<h4></h4>");
            t.text(days[i].dt_txt.slice(0, 10));
            d.append(t);

// retrieving and adding icon 
            var dayIcon = $("<img>");
            dayIcon.attr("src", "https://api.openweathermap.org/img/w/" + days[i].weather[0].icon + ".png");
            dayIcon.width("80px");
            d.append(dayIcon);

// adding paragraph lines of Temp and Humidity from specified city
            var p = $("<p></p>");
            p.addClass("card-text");
            p.text("Temp: " + days[i].main.temp_max + "°F");
            d.append(p);
            var p2 = $("<p></p>");
            p2.addClass("card-text");
            p2.text("Humidity: " + days[i].main.humidity + "%");
            d.append(p2);
        }
      });
    };

// function call to render 5 day forecast upon rendering of current weather forecast 
    day5Forecast();

    };

// function to render buttons

    function renderButtons() {

        $("#city-buttons").empty();

        for (var i = 0; i < cities.length; i++) {

            var c = $("<button>");
            c.addClass("city-btn");
            c.css({"padding":"5px", "margin":"0px 5px 18px 5px"});
            c.attr("data-name", cities[i]);
            c.text(cities[i]);
            console.log(cities[i].toString()[0]);
            $("#city-buttons").append(c);
        }
// function to switch cities upon click of button in history
        $(".city-btn").on("click", function(event) {
            event.preventDefault();
            retrieveCityInfo($(this).attr("data-name"));
            localStorage.setItem(c.attr("data-name"), JSON.stringify(c.text()));
            localStorage.getItem(cities[i]);
        });
    }
    // event function when button is clicked
    $("#button-addon2").on("click", function(event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();
        retrieveCityInfo(city);
        cities.push(city);
        renderButtons();

    });
    renderButtons();
});