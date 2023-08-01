var APIKEY = "73938d437a06b1cfe83f836dc5e06630"




document.getElementById("search-button").addEventListener("click", function(){
    var searchValue = document.getElementById("search-input").value 
    console.log(searchValue)
    getCords(searchValue)
})

function getCords(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        getWeather(data[0].lat,data[0].lon)
        getForcast(data[0].lat,data[0].lon)

    })
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("today").innerHTML = ""
        var currentTemp = document.createElement("h4")
        currentTemp.textContent = "Temp: " + data.main.temp 
        var wind = document.createElement("h4")
        wind.textContent = "Wind: " + data.wind.speed
        var cityName = document.createElement("h2")
        cityName.textContent = data.name
        var cityDate = document.createElement("h2")
        cityDate.textContent = dayjs().format('MM/DD/YYYY')



        var cityWeather = document.createElement("img")
        cityWeather.src= 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
        var cityHumidity = document.createElement("h4")
        cityHumidity.textContent = "Humidity: " + data.main.humidity + "%"

        document.getElementById("today").append(cityName,cityDate,currentTemp, wind, cityHumidity, cityWeather)
    })
}





function getForcast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("forecast").innerHTML = ""
        for(var i = 4; i < data.list.length;i = i + 8) {
            var weatherBox = document.createElement("div")
            weatherBox.setAttribute("class", "weatherBox")
            var currentTemp = document.createElement("h5")
            var cityWeather = document.createElement("img")
            cityWeather.src= 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png'
            currentTemp.textContent = "Temp:" + data.list[i].main.temp
            var wind = document.createElement("h5")
            wind.textContent = "Wind:" + data.list[i].wind.speed
            var cityHumidity = document.createElement("h5")
            cityHumidity.textContent = "Humidity:" + data.list[i].main.humidity + "%"
            weatherBox.append(currentTemp, wind, cityHumidity, cityWeather)
            document.getElementById("forecast").append(weatherBox)

        


        }

    })
}







