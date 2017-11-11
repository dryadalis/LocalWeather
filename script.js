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
            $("#city").text(result.name + ", ");
            $("#country").text(result.sys.country);
            $("#img").attr("src", result.weather[0].icon);
            $("#convertBtn").click(toggle)
            $("#description").text(result.weather[0].description);
            console.log(result);
        }
    })
}


function convertToF(celcius) {
    const fahrenheit = 9/5 * celcius + 32;
    return fahrenheit;
}

const toggleUnit = (tempInC) => {
    let unit = "C";
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
