
let days = document.querySelectorAll("#day");
let date = document.getElementById("date");
let locationText = document.getElementById("location");
let currentDegree = document.getElementById("currentDegree");
let weatherStatus = document.querySelectorAll("#status");
let maxTemp = document.querySelectorAll("#maxDegree");
let minTemp = document.querySelectorAll("#minDegree");
let weatherImg = document.querySelectorAll("#weatherImg");

let searchInp = document.getElementById("searchInp");
let searchBtn = document.getElementById("searchBtn");


let d = new Date();
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




getData("Cairo");


async function getData(location) {

    let req = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=71587bf95ccd447aabe130949212309&q=${location}&days=3&aqi=no&alerts=no`);

    if (req.ok) {

        let allData = await req.json();

        let forecastData = allData;
        displayForecast(forecastData);


    }


}

searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let inputValue = searchInp.value;

    if (inputValue) {
        getData(inputValue);
    }
});

searchInp.addEventListener("keyup", function () {
    let inputValue = searchInp.value;

    if (inputValue) {
        getData(inputValue);
    }
});


function displayForecast(forecast) {


    // Current
    days[0].innerHTML = `${weekday[d.getDay()]}`;
    date.innerHTML = `${d.getDate()} ${month[d.getMonth()]}`;
    locationText.innerHTML = `${forecast.location.name}`;
    currentDegree.innerHTML = `${forecast.current.temp_c}<sup>o</sup>C`;
    weatherStatus[0].innerHTML = `${forecast.current.condition.text}`;
    weatherImg[0].setAttribute("src", `https:${forecast.current.condition.icon}`);

    forecast = forecast.forecast.forecastday;
    // Forecast
    days[1].innerHTML = `${weekday[d.getDay()] == "Saturday" ? weekday[0] : weekday[d.getDay() + 1]}`;
    days[2].innerHTML = `${
    weekday[d.getDay()] == "Friday" ? weekday[0] 
    : weekday[d.getDay()] == "Saturday" ? weekday[1] 
    : weekday[d.getDay() + 2]}`;

    weatherImg[1].setAttribute("src", `https:${forecast[1].day.condition.icon}`);
    weatherImg[2].setAttribute("src", `https:${forecast[2].day.condition.icon}`);

    maxTemp[0].innerHTML = `${forecast[1].day.maxtemp_c}<sup>o</sup>C`;
    maxTemp[1].innerHTML = `${forecast[2].day.maxtemp_c}<sup>o</sup>C`;

    minTemp[0].innerHTML = `${forecast[1].day.mintemp_c}<sup>o</sup>C`;
    minTemp[1].innerHTML = `${forecast[2].day.mintemp_c}<sup>o</sup>C`;
    weatherStatus[1].innerHTML = `${forecast[1].day.condition.text}`;
    weatherStatus[2].innerHTML = `${forecast[2].day.condition.text}`;

}



