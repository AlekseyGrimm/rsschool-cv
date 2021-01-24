import { LanguageEN } from "./En";
import { LanguageRU } from "./Ru";



const buttonRefresh = document.querySelector("#control_button");
const buttonFarenheit = document.querySelector("#farenheit");
const buttonCelsius = document.querySelector("#celsius");
const inputCity = document.querySelector(".search_input");
const buttonSearch = document.querySelector("#search_button");
const locationCity = document.querySelector("#location_city");
const dateNow = document.querySelector(".date_now");
const timeNow = document.querySelector(".time_now");
const tempretureNow = document.querySelector(".tempreture_now");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const body = document.querySelector("#body");
const overcast = document.querySelector("#overcast");
const feelsLike = document.querySelector("#feelsLike");
const speedWind = document.querySelector("#speedWind");
const humidity = document.querySelector("#humidity");
const iconWeatherNow = document.querySelector(".icon_weatherNow");
const iconOne = document.querySelector(".icon_one");
const iconTwo = document.querySelector(".icon_two");
const iconThree = document.querySelector(".icon_three");
const firstDay = document.querySelector("#firstDay");
const secondDay = document.querySelector("#secondDay");
const thirdDay = document.querySelector("#thirdDay");
const firstTemperature = document.querySelector("#firstTemperature");
const secondTemperature = document.querySelector("#secondTemperature");
const thirdTemperature = document.querySelector("#thirdTemperature");
const buttonRussianLanguage = document.querySelector("#language_ru");
const buttonEnglishlanguage = document.querySelector("#language_en");
const isRu = buttonRussianLanguage;
const but = "isFarengeit";
let latitudeNow;
let longitudeNow;
let isFarengeit = but === "true";
let weather;
let adress;
let city = localStorage.getItem("city");
let lang = isRu ? "ru" : "en";
let info = isRu ? LanguageRU : LanguageEN;


// button Language RU and EH
function activeButtonLang(buttonRussianLanguage, buttonEnglishlanguage) {
    buttonRussianLanguage.classList.add("active");
    buttonRussianLanguage.classList.remove("not_active");
    buttonEnglishlanguage.classList.remove("active");
    buttonEnglishlanguage.classList.add("not_active");
};

function initializeLangButton() {
    if (isRu) {
        activeButtonLang(buttonRussianLanguage, buttonEnglishlanguage);
    }
};
initializeLangButton();

function langRu() {
    lang = "ru";
    info = LanguageRU;
    activeButtonLang(buttonRussianLanguage, buttonEnglishlanguage);
    changeLocalLang();
};

function langEn() {
    lang = "en";
    info = LanguageEN;
    activeButtonLang(buttonEnglishlanguage, buttonRussianLanguage);
    changeLocalLang();
};

function changeLocalLang() {
    showAdress(latitudeNow, longitudeNow);
    showWeatherNow(city);
    getCoordinats(latitudeNow, longitudeNow);
};


function getMap(latitudeNow, longitudeNow) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhbHBldGMiLCJhIjoiY2trNWFqNmU4MDlhaDJvbGtocjlnN2s1ZiJ9.aDls4v3wiKMmvUBS76whKQ';
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [longitudeNow, latitudeNow], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    const marker = new mapboxgl.Marker()
        .setLngLat([longitudeNow, latitudeNow])
        .addTo(map);
};

function getAdress(latitudeNow, longitudeNow) {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?language=${lang}&q=${latitudeNow}+${longitudeNow}&key=7ec9383669c44f36be73334edd48f8b1`)
        .then((response) => response.json());
};

function searchSity(city) {
    return fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&language=${lang}&key=7ec9383669c44f36be73334edd48f8b1`)
        .then((response) => response.json());
};

async function showSearchCity(city) {
    try {
        if (!city) {
            city = inputCity.value;
        }
        adress = await searchSity(city);

        if (adress) {
            const result = adress.results[0].components;
            city = result.city ? result.city : result.town ? result.town : result.village;

            const { country } = result;
            locationCity.textContent = `${city}, ${country}`;

            const Now = adress.results[0].geometry;

            LatitudeNow = Now.lat.toFixed(2); //show lat and lng formats a number using fixed-point notation 
            LongitudeNow = Now.lng.toFixed(2);

            localStorage.setItem("city", city); // save city in localStorage
            inputCity.value = "";

            showWeatherNow(city);
            getMap(LatitudeNow, LongitudeNow);
            getCoordinats(LatitudeNow, LongitudeNow);
        }
    } catch (error) {
        alert(error);
    }
};

async function showAdress(latitudeNow, longitudeNow) {
    try {
        adress = await getAdress(latitudeNow, longitudeNow);
        console.log(adress);
        const locations = adress.results[0].components;
        city = locations.city;
        const { country } = locations;

        locationCity.textContent = `${city}, ${country}`;
        showWeatherNow(city);
    } catch (error) {
        alert(error);
    }
};

function getCoordinats(latitudeNow, longitudeNow) {
    const lat = String(latitudeNow).split(".");
    const lon = String(longitudeNow).split(".");
    const latMinutes = lat[0];
    const latSeconds = lat[1];
    const lonMinutes = lon[0];
    const lonSeconds = lon[1];

    latitude.textContent = `${info.positions.latit} ${latMinutes}°  ${latSeconds}'`;
    longitude.textContent = `${info.positions.longit} ${lonMinutes}°  ${lonSeconds}'`;
    buttonSearch.textContent = `${info.search.but}`;
    inputCity.placeholder = `${info.search.input}`;
};

const getWeatherNow = async (city) =>
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Grodno&units=metric&lang=${lang}&appid=c3ee163c21d694ddab64849983b70180`)
        .then((response) => response.json());

async function showWeatherNow(city) {
    try {
        weather = await getWeatherNow(city);
        console.log(weather);

        const data = weather.list;
        const feelLike = data[0].main.feels_like;
        const temporaryNow = Math.round(data[0].main.temp);
        const firstTemporary = data[8].main.temp;
        const secTemporary = data[16].main.temp;
        const thirdTemporary = data[24].main.temp;


        // value Farengeit or celsius
        tempretureNow.textContent = isFarengeit ? `${Math.round(temporaryNow * (9 / 5) + 32)}°` : `${temporaryNow}°`;
        firstTemperature.textContent = isFarengeit ? `${Math.round(firstTemporary * (9 / 5) + 32)}°` : `${Math.round(firstTemporary)}°`;
        secondTemperature.textContent = isFarengeit ? `${Math.round(secTemporary * (9 / 5) + 32)}°` : `${Math.round(secTemporary)}°`;
        thirdTemperature.textContent = isFarengeit ? `${Math.round(thirdTemporary * (9 / 5) + 32)}°` : `${Math.round(thirdTemporary)}°`;

        overcast.textContent = data[0].weather[0].description;

        feelsLike.textContent = isFarengeit ? `${info.summary.feels} ${`${Math.round(feelLike * (9 / 5) + 32)}°`}` : `${info.summary.feels} ${`${Math.round(feelLike)}°`}`;
        humidity.textContent = `${info.summary.humidity} ${data[0].main.humidity}%`;
        speedWind.textContent = `${info.summary.wind} ${data[0].wind.speed.toFixed()} ${info.summary.speed}`;

        // img of the current weather
        iconWeatherNow.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png)`;
        iconOne.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data[8].weather[0].icon}@2x.png)`;
        iconTwo.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data[16].weather[0].icon}@2x.png)`;
        iconThree.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data[24].weather[0].icon}@2x.png)`;

        showTime();
    } catch (error) {
        alert(error);
    }
};
showWeatherNow();


function initMap() {
    navigator.geolocation.getCurrentPosition(showMap);

    function showMap(position) {
        latitudeNow = position.coords.latitude.toFixed(2);
        longitudeNow = position.coords.longitude.toFixed(2);

        getCoordinats(latitudeNow, longitudeNow);
        showAdress(latitudeNow, longitudeNow);
        getMap(latitudeNow, longitudeNow);
    }
};

// if the city is not found then displays a map with coordinates
function initializeCity(city) {
    if (city) {
        showSearchCity(city);
    } else {
        initMap();
    }
};
initializeCity();


function showTime() {
    const now = new Date();
    const currentTimeZoneOffsetInHours = now.getTimezoneOffset() * 60000;
    const localTime = now.getTime() + currentTimeZoneOffsetInHours + weather.city.timezone * 1000;
    const today = new Date(localTime);
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    timeNow.textContent = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    let dayofWeek = today.getDay();
    const dayNumber = today.getDate();
    const month = today.getMonth();

    dateNow.textContent = `${info.dayOfWeekAbbreviated[dayofWeek]} ${dayNumber} ${info.months[month]}`;
    dayofWeek++;

    if (dayofWeek > 6) {
        dayofWeek = 0;
        firstDay.textContent = `${info.dayOfWeek[dayofWeek]}`;
    }
    firstDay.textContent = `${info.dayOfWeek[dayofWeek]}`;
    dayofWeek++;
    if (dayofWeek > 6) {
        dayofWeek = 0;
        secondDay.textContent = `${info.dayOfWeek[dayofWeek]}`;
    }
    secondDay.textContent = `${info.dayOfWeek[dayofWeek]}`;
    dayofWeek++;
    if (dayofWeek > 6) {
        dayofWeek = 0;
        thirdDay.textContent = `${info.dayOfWeek[dayofWeek]}`;
    }
    thirdDay.textContent = `${info.dayOfWeek[dayofWeek]}`;

    setTimeout(showTime, 1000);
};

function addZero(n) {
    return (Number.parseInt(n, 10) < 10 ? "0" : "") + n;
};

function activeButtonTemp(buttonFarenheit, buttonCelsius) {
    buttonFarenheit.classList.remove("active");
    buttonCelsius.classList.add("active");
    showAdress(latitudeNow, longitudeNow);
    showWeatherNow(city);
};

function TempButton() {
    if (isFarengeit) {
        buttonFarenheit.classList.add("active");
        buttonCelsius.classList.remove("active");
    }
};
TempButton();


// button click C of F
function Celsius() {
    isFarengeit = false;
    activeButtonTemp(buttonCelsius, buttonFarenheit);
};

function Farenheit() {
    isFarengeit = true;
    activeButtonTemp(buttonFarenheit, buttonCelsius);
};

// add inter
function KeyBoard(e) {
    if (e.which === 13) {
        showSearchCity();
    }
};

async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.regular;
};

async function getBackground() {
    try {
        const backgroundLink = await getLinkToImage();
        body.style.backgroundImage = `url(${backgroundLink})`;
        body.style.transition = "1s";
    } catch (error) {
        alert(error);
    }
};


buttonRefresh.addEventListener("click", getBackground);
buttonEnglishlanguage.addEventListener("click", langEn);
buttonRussianLanguage.addEventListener("click", langRu);
buttonCelsius.addEventListener("click", Farenheit);
buttonFarenheit.addEventListener("click", Celsius);
buttonSearch.addEventListener("click", showSearchCity);
window.addEventListener("keypress", KeyBoard);

