$( document ).ready(function() {
    var APIKey = "186950d5261992f795f01a481c7fd390";
    var city = $("#city-input").val().trim();
    var cities = [];

    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    // figure out lat & lon
    var uviQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"; 

    console.log(weatherQueryURL);

// current weather API
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
      })
      .then(function(response) {

     var cityName = $("#city-name").text(response.name);

     $("<ul>").append(cityName);

    });

    // event function when button is clicked
    $("#button-addon2").on("click", function(event) {

        event.preventDefault();

        var city = $("#city-input").val().trim();

        cities.push(city);
        console.log(cities);

    // need to call function here!!!

    })



});