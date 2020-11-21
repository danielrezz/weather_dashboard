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
        var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
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

     var temperature = $("#temperature").text("Temperature: " + response.main.temp + "°");
     $("#current-conditions").append(temperature);

     var humidity = $("#humidity").text("Humidity: " + response.main.humidity);
     $("#current-conditions").append(humidity);

     var windSpeed = $("#wind-speed").text("Wind Speed: " + response.wind.speed);
     $("#current-conditions").append(windSpeed);

    });
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

        retrieveCityInfo();

        event.preventDefault();

        var city = $("#city-input").val().trim();

        cities.push(city);

    renderButtons();

    });
    renderButtons();

});