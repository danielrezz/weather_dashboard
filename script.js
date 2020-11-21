$( document ).ready(function() {
    // var APIKey = "186950d5261992f795f01a481c7fd390";
    // var city = $("#city-input").val().trim();
    var cities = [];

    // var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    // var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    // figure out lat & lon
    // var uviQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"; 

    function retrieveCityInfo() {

        var APIKey = "186950d5261992f795f01a481c7fd390";
        var city = $("#city-input").val().trim();
        // var lat = response.coord.lat;
        // var lon = response.coord.lon;
        var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
        var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
        // var uviQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey; 
        var date = moment().format("L");

// current weather API
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
      }).then(function(response) {

     var cityName = $("#city-name").text(response.name + " (" + date + ")");
     $("#current-conditions").append(cityName);

     var icon = $("#icon").attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png");
     $("#current-conditions").append(icon);

     var temperature = $("#temperature").text("Temperature: " + response.main.temp + "°F");
     temperature.css("list-style", "none");
     $("#current-conditions").append(temperature);

     var humidity = $("#humidity").text("Humidity: " + response.main.humidity);
     humidity.css("list-style", "none");
     $("#current-conditions").append(humidity);

     var windSpeed = $("#wind-speed").text("Wind Speed: " + response.wind.speed);
     windSpeed.css("list-style", "none");
     $("#current-conditions").append(windSpeed);

     var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uviQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey; 

        $.ajax({
            url: uviQueryURL,
            method: "GET"
          }).then(function(response) {
    
            var uvi = $("#uv-index").text("UV Index: " + response.value);
            uvi.css("list-style", "none");
            $("#current-conditions").append(uvi);

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

// 5 day forecast

    function day5Forecast() {

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
      }).then(function(response) {

        var day1 = response.list[5];
        var day2 = response.list[13];
        var day3 = response.list[21];
        var day4 = response.list[29];
        var day5 = response.list[37];
        var days = [day1, day2, day3, day4, day5];

        $(".forecast-div").empty();

        for (var i = 0; i < days.length; i++) {

            var d = $("<div></div>");
            d.addClass("card bg-light mb-3");
            d.width("18rem");
            $(".forecast-div").append(d);
            var t = $("<h4></h4>");
            t.text(days[i].dt_txt.slice(0, 10));
            d.append(t);
            var dayIcon = $("<img>");
            dayIcon.attr("src", "https://api.openweathermap.org/img/w/" + days[i].weather[0].icon + ".png");
            dayIcon.width("80px");
            d.append(dayIcon);
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

    day5Forecast();


    };

// function to render buttons

    function renderButtons() {

        $("#city-buttons").empty();

        for (var i = 0; i < cities.length; i++) {

            var c = $("<button>");
            c.addClass("city-btn");
            c.attr("data-name", cities[i]);
            c.text(cities[i]);
            $("#city-buttons").append(c);

        }
    }

    // event function when button is clicked
    $("#button-addon2").on("click", function(event) {
        event.preventDefault();

        retrieveCityInfo();

        var city = $("#city-input").val().trim();
        cities.push(city);

    renderButtons();

    });
    renderButtons();

});