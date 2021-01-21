
window.addEventListener("load", function () {
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
    const LanguageRU = "ru";
    const LanguageEN = "en";
    let latitudeNow;
    let longitudeNow;
    let isFarengeit;
    let weather;
    let adress;
    let lang = isRu ? "ru" : "en";
    let info = isRu ? LanguageRU : LanguageEN;


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
        return fetch(`https://api.opencagedata.com/geocode/v1/json?language=en&q=${latitudeNow}+${longitudeNow}&key=7ec9383669c44f36be73334edd48f8b1&language=${lang}`)
            .then((response) => response.json());
    };

    function searchSity(city) {
        return fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&&language=${lang}&key=7ec9383669c44f36be73334edd48f8b1`)
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

                LatitudeNow = Now.lat.toFixed(2);
                LongitudeNow = Now.lng.toFixed(2);

                localStorage.setItem("city", city);
                inputCity.value = "";

                getMap(LatitudeNow, LongitudeNow);
                getCoordinats(LatitudeNow, LongitudeNow);
                showWeatherNow(city);
            }
        } catch (error) {
            alert(error);
        }
    };

    function initializeCity(city) {
        if (city) {
            showSearchCity(city);
        } else {
            initMap();
        }
    };
    initializeCity();


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
    };

    const getWeatherNow = async (city) =>
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Minsk&lang=en&units=metric&appid=c3ee163c21d694ddab64849983b70180`)
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

            tempretureNow.textContent = isFarengeit ? `${Math.round(temporaryNow * (9 / 5) + 32)}°` : `${temporaryNow}°`;
            firstTemperature.textContent = isFarengeit ? `${Math.round(firstTemporary * (9 / 5) + 32)}°` : `${Math.round(firstTemporary)}°`;
            secondTemperature.textContent = isFarengeit ? `${Math.round(secTemporary * (9 / 5) + 32)}°` : `${Math.round(secTemporary)}°`;
            thirdTemperature.textContent = isFarengeit ? `${Math.round(thirdTemporary * (9 / 5) + 32)}°` : `${Math.round(thirdTemporary)}°`;

            overcast.textContent = data[0].weather[0].description;

            feelsLike.textContent = isFarengeit ? `${info.summary.feels} ${`${Math.round(feelLike * (9 / 5) + 32)}°`}` : `${info.summary.feels} ${`${Math.round(feelLike)}°`}`;
            humidity.textContent = `${info.summary.humidity} ${data[0].main.humidity}%`;
            speedWind.textContent = `${info.summary.wind} ${data[0].wind.speed.toFixed()} ${info.summary.speed}`;

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
    initMap();



});

