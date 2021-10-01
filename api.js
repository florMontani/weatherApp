//api
const d = document;
const search_submit = d.getElementById('search_input');
const search_button = d.getElementById('send');

const api = {
    key:"989e770ee0de9c045d387eb186a1428e",
    lang: "es",
    url:"https://api.openweathermap.org/data/2.5/weather"
}
const lastRequest = JSON.parse(localStorage.getItem('API request'));

if (lastRequest != null){
    infoWeather(lastRequest);
}
//enter
search_submit.addEventListener('keypress', (event) =>{
    if(event.keyCode == 13){
        console.log(search_submit.value);
        getWeatherData(search_submit.value);
    }
})

//click
search_button.addEventListener('click', clickSend);
function clickSend () {
    let search_submit = d.getElementById('search_input');
    console.log(search_submit.value);
    getWeatherData(search_submit.value);
}
  




//api request
function getWeatherData (loc)  {
    fetch(`${api.url}?q=${loc}&appid=${api.key}&lang=${api.lang}&units=metric`).then(function (weather) {
        console.log(weather);
        return weather.json();
    }).then(function (weatherJSON){
        console.log(weatherJSON);
        infoWeather(weatherJSON);
        saveLocalStorage(weatherJSON);

    }).catch(function (error){
        console.log(error)
    });
  
  
}
function saveLocalStorage (weather){
    localStorage.setItem('API request', JSON.stringify(weather));
}











//wheatherfuntion´s
function infoWeather (weather) {
    console.log(weather);
  
    //temperature
    let temperature = d.getElementById('degreeNumber');
    temperature.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    //icon
    // document.getElementById('inputTemp_symbol').src = "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png";

    //description
    let weatherDescription = d.getElementById('description');
    weatherDescription.innerHTML = `${weather.weather[0].description}`;
     
     //city 
    let city = d.getElementById('city');
    city.innerHTML =`${weather.name}, ${weather.sys.country}`;

    //day
    let date = d.getElementById('date');
    let day = new Date();
    date.innerText = calendar(day);
    //hours
    const dayHours = d.getElementById('hours');
    setInterval(()=> {
        const time = new Date();
        let hours = time.getHours();
        let formatHours = hours >= 13 ? hours %12: hours
        let ampm = hours >12 ? 'pm' : 'am';
        let minutes = time.getMinutes();
        
        dayHours.innerHTML = ` ${formatHours} : ${minutes} <span>${ampm} </span>`;
    },100);
    
    

    //min
    let min = d.getElementById('min');
    min.innerHTML = `Minima: ${Math.floor(weather.main.temp_min)}&deg;C`;
    //max
    let max = d.getElementById('max');
    max.innerHTML = ` Máxima: ${Math.floor(weather.main.temp_max)}&deg;C`;
    //humidity
    let humidity = d.getElementById('humidity');
    humidity.innerHTML = `Humedad: ${weather.main.humidity}%`;
    // thermal sensation
    let thermalSensation = d.getElementById('thermalSensation');
    thermalSensation.innerHTML = `Sensación térmica: ${weather.main.feels_like}`;
    //atmospheric pressure
    let pressure = d.getElementById('pressure');
    pressure.innerHTML = `Presión: ${weather.main.pressure} hectopascales`;
    //wind speeds
    let wind = d.getElementById('wind');
    wind.innerHTML = `Velocidad del viento: ${weather.wind.speed}`;

 

  //icono
  let icono = weather.weather[0].icon;
  d.getElementById('inputTemp_symbol').src = "http://openweathermap.org/img/wn/" + icono  + "@4x.png";
  d.getElementById('inputTemp_symbol').alt=`${weather.weather[0].description}`;
  
}

// dayfunction´s
function calendar  (day) {

    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
   
    let date = day.getDate();
    let month = months[day.getMonth()];
    let year = day.getFullYear();

    return `${date} de ${month} del ${year}`;
}

   


















