const input = document.querySelector("input");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const timeDisplay = document.querySelector(".time"); // New element for time display
const errorMessage = document.querySelector(".error-message");

const apiKey = "fe34cc1541968d9edfb43c226cc3ed3c";


btn.addEventListener("click", () => {
    let city = input.value;
    if (city) {
        getWeather(city);
    } else {
        errorMessage.innerHTML = "Please enter a city name.";
    }
});

// Fetch weather data by city name
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            errorMessage.innerHTML = error.message;
        });
}


// Display weather information along with time
function displayWeather(data) {
    errorMessage.innerHTML = ""; // Clear previous error message

    const iconCode = data.weather[0].icon;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" />`;

    const weatherCity = data.name;
    const weatherCountry = data.sys.country;
    weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

    let weatherTemp = data.main.temp - 273.15; // Convert to Celsius
    temperature.innerHTML = `${weatherTemp.toFixed(2)}°C`;

    const weatherDesc = data.weather[0].description;
    description.innerHTML = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);

    const weatherHumidity = data.main.humidity;
    humidity.innerHTML = `Humidity: ${weatherHumidity}%`;

    const weatherWind = data.wind.speed;
    wind.innerHTML = `Wind Speed: ${weatherWind} m/s`;

    const weatherCondition = data.weather[0].main; 
    changeBackground(weatherCondition); 

    const timezoneOffset = data.timezone; 
    displayTime(timezoneOffset);
}

// Function to change the background based on weather condition
function changeBackground(condition) {
    const body = document.body;

    switch (condition.toLowerCase()) {
        case "clear":
            body.style.background = "linear-gradient(to bottom, #74ebd5, #acb6e5)"; 
            break;
        case "clouds":
            body.style.background = "linear-gradient(to bottom, #d3cce3, #e9e4f0)";
            break;
        case "rain":
        case "drizzle":
            body.style.background = "linear-gradient(to bottom, #89f7fe, #66a6ff)"; 
            break;
        case "thunderstorm":
            body.style.background = "linear-gradient(to bottom, #1f1c2c, #928dab)"; 
            break;
        case "snow":
            body.style.background = "linear-gradient(to bottom, #e6dada, #274046)"; 
            break;
        case "mist":
        case "fog":
            body.style.background = "linear-gradient(to bottom, #3e5151, #decba4)";  
            break;
        default:
            body.style.background = "linear-gradient(to bottom, #74ebd5, #acb6e5)";
    }
}


function displayTime(timezoneOffset) {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; 
    const localTime = new Date(utcTime + (timezoneOffset * 1000)); 

    const hours = localTime.getHours().toString().padStart(2, "0");
    const minutes = localTime.getMinutes().toString().padStart(2, "0");
    const seconds = localTime.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}`;
    timeDisplay.innerHTML = `${timeString}`;
}



