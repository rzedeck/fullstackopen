const DisplayWeather = ({ cityName, weather, icon }) => {

    if (Object.keys(weather).length === 0){
        return
    }
  
    return (
      <div>
        <h2>Weather in {cityName}</h2>
        <p>Temperature {weather.main.temp}°C</p>
        <img src={icon}/>
        <p>Wind {weather.wind.speed}m/s</p>
      </div>
    )
  }
  
  export default DisplayWeather