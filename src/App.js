import React from 'react';
import { useState } from 'react';

const apiKey = {
  key:  "34f872301478a5a08ec0dc37d6090bcb",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [type, setType] = useState(true);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${apiKey.base}weather?q=${query}&units=metric&APPID=${apiKey.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          // console.log(result);
        });
      }
  }


const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

const getTemp = () =>{
  if(type && weather.main){
    return  Math.round(weather.main.temp) + '°C'
  }else{
   return (1.8 *  Math.round(weather.main.temp) +32 ) + '°F'
  }
}






  return (
    <div className = { typeof weather.main !== 'undefined' ?
    (Math.round(weather.main.temp) > 25 ? "App" : "App warm") : "App"} >

      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar"
          placeholder = "Search here..." 
          onChange={ e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          />
        </div>

       {(typeof weather.main !== 'undefined') ? (
         <div>
         <div className="location-box">
           <div className="location">
             {weather.name}
           </div>
 
           <div className="date">{dateBuilder(new Date())}</div>
          
         </div>
         <div className="weather-box">
           <div 
           className="temp"
           onClick = {() => setType(!type)}
           >
             {getTemp()}
           </div>
 
           <div className="weather">{weather.weather[0].main}</div>
         </div>
         </div>
       ) : (
         <div className="date"> Không tìm thấy thành phố nào...!</div>
       )}


            <div className="owner">Developer by Tấn Tài</div>
      </main>
     
    </div>
  );
}

export default App;
