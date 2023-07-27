// ----- City
let currCity = 'London';
let units = 'metric';

// ----- Getting html elements
let city = document.querySelector('#city');
let dateTime = document.querySelector('#dateTime');
let forecast = document.querySelector('#forecast')
let temp = document.querySelector('#temp');
let icon = document.querySelector('#icon');
let minMax = document.querySelector('#minMax');
let feelsLike = document.querySelector('#feelsLike');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let pressure = document.querySelector('#pressure');
let container = document.querySelector('#container');

// ----- Search
document.querySelector('#form').addEventListener('submit', e => {
    let search = document.querySelector('#search');
    e.preventDefault();
    // Change city
    currCity = search.value;

    getWeather();
    search.value = '';
});

// ----- Unit Change
document.querySelector('#celsius').addEventListener('click', () => {
    if(units !== 'metric') {
        units = 'metric';
        getWeather();
    }
});

document.querySelector('#farenheit').addEventListener('click', () => {
    if(units !== 'imperial') {
        units = 'imperial';
        getWeather();
    }
});

// ----- TimeStamp Conversion
let convertTimeStamp = (timestamp, timezone) => {
    const convertTimezone = timezone / 3600; // Second to hours
    const date = new Date(timestamp * 1000);

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: `Etc/GMT${convertTimezone >= 0 ? '-':'+'}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString('en-US', options)
}

// ----- Country Code to name
let convertCountryCode = (country) => {
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(country);
}

let getWeather = () => {
    const API_KEY = '5279621a170d92cc2a012e920de9dabf';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);

        forecast.innerHTML =`<p>${data.weather[0].main}</p>`;
        temp.innerHTML = `${data.main.temp.toFixed()}&#176`;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`;

        minMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>
                            <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;

        feelsLike.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} ${units === 'imperial' ? 'mph': 'm/s'}`;
        pressure.innerHTML = `${data.main.pressure} hPa`
    });
}

// ----- Backround change with time
// let backgroundUpdate = () => {
//     let currDate = new Date();
//     let currTime = currDate.getHours();
//     let ft = currDate.toLocaleString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true
//     });

//     if()
// }

document.addEventListener('load', getWeather(), backgroundUpdate());

// let currTime = new Date().getHours();
//     console.log(currTime)
//     if(currTime < 10) {
//         container.style.background = 'linear-gradient(135deg,#5b548a, hsl(180, 100%, 40%))';
//     }