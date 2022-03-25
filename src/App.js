import './App.css';
import React,{useState} from "react";
const api = {
  key: "3021eb773ed684192bd39ab413358215",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
   const [query,setQuery]=useState('');
   const [weather,setWeather]=useState({});

   const search=event=>{
        if(event.key==="Enter"){
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(response=>response.json())
          .then(res=>{
            setWeather(res);
            setQuery('');
            console.log(res);
          });
        }
   }
  const dateBuilder=(d)=>{
    const months=["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month=months[d.getMonth()];
    const day=days[d.getDay()];
    const year=d.getFullYear();
    const date=d.getDate();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined")?((weather.main.temp>16)?'app warm':'app'):'app'}>
      <main>
        <div className="search-box">
          <input className="search-bar" type="text" placeholder="Search..."
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main !="undefined") ?(
          <div>
        <div className="location-box">
          <div className="location"> {weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>  
          </div>
          <div className="weather-box">
            <div className="temp">
            {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
