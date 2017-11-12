const api = "https://fcc-weather-api.glitch.me/api/current?";
let lat, lon;

function getWeather(lat, lon) {
    const urlString = api + "lat=" + lat + "&" + "lon=" + lon;
    console.log(urlString)
    $.ajax({
        url: urlString, 
        success: function (result) {
            const toggle = toggleUnit(result.main.temp)
            //first toggle call sets temp in celsius
            toggle()
            document.getElementById('city').innerHTML = (result.name + ", ");
            document.getElementById('country').innerHTML =(result.sys.country);
            document.getElementById('convertBtn').addEventListener("click", toggle);
            document.getElementById('description').innerHTML = (result.weather[0].description);
            const weather = {
                temperatureInC: result.main.temp
            }
            displayIcon(weather);
        }
    })
}
//Set local time and date.
function getTime()
{
    const date = new Date();
    return date.toLocaleTimeString();
}
 
//wywołanie ma na celu eliminację opóźnienia sekundowego
document.getElementById('time').innerHTML = getTime();
 
setInterval(function() {
 
    document.getElementById('time').innerHTML = getTime();
     
}, 1000);
function getDate()
{
    return (new Date()).toLocaleDateString();
}
document.getElementById('date').innerHTML = getDate();

// Convert Celcius to Fahrenheit
function convertToF(celcius) {
    const fahrenheit = 9/5 * celcius + 32;
    return fahrenheit;
}

const toggleUnit = (tempInC) => {
    let unit = "C" ;
    return () => {
        if(unit === 'C') {
            $("#temp").text(tempInC);
            $("#convertBtn").text("Convert to F")
            unit = "F"
        } else {
            $("#temp").text(convertToF(tempInC))
            $("#convertBtn").text("Convert to C")
            unit = "C"
        }
    }
}

function displayIcon (weather) {
    const hour = (new Date()).getHours();   
    const icon = document.getElementById('icon');
    const temp = weather.temperatureInC;
    if( hour <= 5 || hour >= 18){
        icon.classList.add("wi-night-clear");
    } else {
        icon.classList.add("wi-day-sunny");
            if (temp >= 25){
                icon.classList.add("wi-hot");
            } else if (temp < 25 || temp >= 10) {
                icon.classList.add("wi-day-cloudy");
            } else if (temp < 10 || temp >= 0) {
                icon.classList.add("wi-cloud");
            } else {
                icon.classList.add("wi-snowflake-cold");
            }
        console.log("day");
    }
}

// Get your current location.
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
