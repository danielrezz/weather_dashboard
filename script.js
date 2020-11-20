$( document ).ready(function() {
    var APIKey = "186950d5261992f795f01a481c7fd390";
    var city = $("#city-input").val().trim();

    var weatherQueryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    var forecastQueryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    // figure out lat & lon
    var uviQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"; 

    







});