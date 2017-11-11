const api = "https://fcc-weather-api.glitch.me/api/current?";
let lat, lon;

function getWeather(lat, lon) {
    const urlString = api + "lat=" + lat + "&" + "lon=" + lon;
    console.log(urlString)
    $.ajax({
        url: urlString, 
        success: function (result) {
            console.log(city)
            $("#city").text(result.name + ", ");
            $("#country").text(result.sys.country);
            $("#temp").text(result.main.temp);
            $("#img").attr("src", result.weather[0].icon);
        }
    })
}

$(document).ready(function(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((positon) => {
            lat = positon.coords.latitude;
            lon = positon.coords.longitude;
            getWeather(lat, lon)
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
})
