//connect weather api to allow search ability on click
//843fa40ad68a96668befb0da86d9b44b, new key - 9e12af8fcc8a0d6205c7f203926a2756
//When putting a city in the search bar I can click search to pull its local weather


function searchHistory() {
    var recentSearch = []
    recentSearch.push($('#search').val());

    $.each(recentSearch, function(index, value) {
        const p = document.createElement("p")
        p.innerHTML = value;
        document.getElementById("history").appendChild(p);
    })
}

function getCurrentWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+$('#search').val()+"&appid=9e12af8fcc8a0d6205c7f203926a2756&units=imperial")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        $("#currentDate").text(data.name + " (Today)")
        $("#currentTemp").text("temp:" + data.main.temp + "°F")
        $("#currentWind").text("wind:" + data.wind.speed)
        $("#currentHum").text("humidity:" + data.main.humidity)
    })


}
 let fiveDayForecast = []
function getFutureWeather() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+$('#search').val()+"&appid=9e12af8fcc8a0d6205c7f203926a2756&units=imperial")
    .then(res => res.json())
    .then(data => {
       let uniqueForecastDay = [];
       fiveDayForecast =data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if(!uniqueForecastDay.includes(forecastDate)) {
            return uniqueForecastDay.push(forecastDate);
        }
      }); 
      console.log(fiveDayForecast)
    //   $("#cardtemp").text("temp:" + data.main.temp + "°F")
    //   $("#cardWind").text("wind:" + data.wind.speed)
    //   $("#cardHum").text("humidity:" + data.main.humidity)
    console.log()
    for (var i =0; i<fiveDayForecast.length-1; i++) {
        let day = fiveDayForecast[i]
        console.log(`Date ${day.dt_txt}`)
        document.getElementById(`date${i+1}`).innerHTML = `Date: ${day.dt_txt}`
        document.getElementById(`date${i+1}`).innerHTML = `Date: ${day.dt_txt}`
        document.getElementById(`temp${i+1}`).innerHTML = `temp: ${day.main.temp} °F`
        document.getElementById(`wind${i+1}`).innerHTML = `wind: ${day.wind.speed} mph`
        document.getElementById(`hum${i+1}`).innerHTML = `humidity: ${day.main.humidity}`

        // document.getElementById(`imgFuture1${i+1}`).innerHTML = ` ${day.weather[1].icon}`
    
    }
      
    })


}



$("#searchButton").on("click", getFutureWeather)
 $("#searchButton").on("click", getCurrentWeather)


// After I click search, A history is created un the search bar

//when a city is searched, the current local weather appears with the 
//city name, date, and icon,  with temp, wind, and humidity under it.

// The 5 day forecast also appears under that in 5 idividual cards displaying a different day

// each card will also contain the date, icon, temp, wind, humidity