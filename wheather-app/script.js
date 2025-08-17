const weatherData = {
    tehran: { temp: 31, condition: "آفتابی", humidity: 22, wind: 14 },
    mashhad: { temp: 27, condition: "نیمه‌ابری", humidity: 35, wind: 10 },
    shiraz: { temp: 34, condition: "آفتابی", humidity: 18, wind: 12 },
    tabriz: { temp: 24, condition: "بارانی", humidity: 50, wind: 8 },
    esfahan: { temp: 29, condition: "ابری", humidity: 40, wind: 11 },
    rasht: { temp: 26, condition: "بارانی", humidity: 78, wind: 6 },
    yazd: { temp: 38, condition: "آفتابی", humidity: 12, wind: 15 },
    kerman: { temp: 30, condition: "نیمه‌ابری", humidity: 28, wind: 9 },
    ahvaz: { temp: 41, condition: "گرد و غبار", humidity: 20, wind: 18 },
    bandarabbas: { temp: 36, condition: "شرجی", humidity: 80, wind: 7 },
};

const weatherTranslate = {
    آفتابی: "sunny",
    ابری: "cloudy",
    نیمه‌ابری: "partly-cloudy",
    بارانی: "rainy",
    "گرد و غبار": "dust",
    شرجی: "sultry",
};

const inputCity = document.querySelector(".search-city .city-input");
const btn = document.querySelector(".search-city .btn");
let cityName = localStorage.getItem("cityName");
let existCity = false;
const keys = Object.keys(weatherData);
let weatherSection = document.querySelector(".weather-section");

const Temp = document.querySelector(
    ".weather-section .weather-schema .right-schema .temp"
);
const City = document.querySelector(
    ".weather-section .weather-schema .left-schema .city-name"
);
const Condition = document.querySelector(
    ".weather-section .weather-schema .left-schema .condition"
);
const Humidity = document.querySelector(
    ".weather-section .weather-details .humidity"
);
const Wind = document.querySelector(".weather-section .weather-details .wind");

let img = document.querySelector("#image");

if (cityName !== null && cityName) {
    console.log("localstorage:" + cityName);
    showWeatherDetails();
} else {
    console.log("local storage is empty.");
}

btn.addEventListener("click", () => {
    cityName = inputCity.value;
    showWeatherDetails();
});

inputCity.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

function showWeatherDetails() {
    existCity = false;

    keys.forEach((value) => {
        if (cityName === value) {
            existCity = true;
            return;
        }
    });
    console.log(existCity);

    if (existCity) {
        console.log(cityName);
        City.innerHTML = `City: ${cityName.toUpperCase()}`;
        Temp.innerHTML = `Temp: <br> ${weatherData[cityName].temp} °C`;
        Condition.innerHTML = `Condition: ${weatherData[cityName].condition}`;
        Humidity.innerHTML = `Humidity: <br> ${weatherData[cityName].humidity} %`;
        Wind.innerHTML = `Wind: <br> ${weatherData[cityName].wind} km/h`;

        img.setAttribute(
            "src",
            `./assets/weather-icons-master/myPic/${
                weatherTranslate[weatherData[cityName].condition]
            }.svg`
        );

        if (weatherSection.classList.length <= 1) {
            weatherSection.classList.add(
                weatherTranslate[weatherData[cityName].condition]
            );
        } else {
            // Get the element's class names as an array
            const classNames = weatherSection.className.split(" ");

            // Get the last class name
            const lastClass = classNames.pop();

            // Remove the last class from the element's classList
            if (lastClass && lastClass !== "weather-section") {
                // Ensure there was a class to remove
                weatherSection.classList.remove(lastClass);
            }

            weatherSection.classList.add(
                weatherTranslate[weatherData[cityName].condition]
            );
        }
    } else {
        console.log("city not exist!");
        alert("City not exist!");
    }

    localStorage.setItem("cityName", cityName);
}

let time = document.querySelector(".time");

setInterval(() => {
    const d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000);
