const api = {
    key: 'a5bcbe8a70bedf3f3d6b0c6a9bffd817',
    baseurl: 'https://api.openweathermap.org/data/2.5/weather'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', event => {
    if (event.keyCode == 13){
        getResults(searchbox.value);
        searchbox.value = "";

    }
})

const getResults = async (query) => {
    const urlToFetch = `${api.baseurl}?&q=${query}&units=metric&&APPID=${api.key}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
          const jsonResponse = await response.json();
          displayResults(jsonResponse);
        }
      } catch (error) {
        console.log(error);
      }
};

const displayResults = weather => {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = generateDate(now);
    let temp = document.querySelector('.current .temp');
    // if (weather.main.temp > 30){
    //     document.querySelector('body').style.backgroundColor = 'red';
    // }
    // else{
    //     document.querySelector('body').style.backgroundColor = 'blue';
    // }
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function generateDate (d){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

getResults('Delhi');