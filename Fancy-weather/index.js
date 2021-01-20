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
    let latitudeNow;
    let longitudeNow;

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
        return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitudeNow}+${longitudeNow}&key=7ec9383669c44f36be73334edd48f8b1`)
            .then((response) => response.json());
    };

    function searchSity(city) {
        return fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=7ec9383669c44f36be73334edd48f8b1`)
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
                city = result.city
                    ? result.city
                    : result.town
                        ? result.town
                        : result.village;

                const { country } = result;
                locationCity.textContent = `${city}, ${country}`;

                const pos = adress.results[0].geometry;

                posLatitude = pos.lat.toFixed(2);
                posLongitude = pos.lng.toFixed(2);

                localStorage.setItem("city", city);
                inputCity.value = "";

                getMap(posLatitude, posLongitude);
                getCoordinats(posLatitude, posLongitude);
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

            const locations = adress.results[0].components;
            city = locations.city;
            const { country } = locations;

            locationCity.textContent = `${city}, ${country}`;
        } catch (error) {
            alert(error);
        }
    };

    function getCoordinats(latitudeNow, longitudeNow) {
        const lat = String(latitudeNow).split(".");
        const lon = String(longitudeNow).split(".");

    };


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
    initMap()



});
