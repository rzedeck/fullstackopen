import DisplayCountryFlag from "./DisplayCountryFlag"
import DisplayWeather from "./DisplayWeather"

const DisplayCountries = ({ countries, weather, weatherIcon, handleClick }) => {
    if(countries){
      if(countries.length === 0){
        return <p>No counties searched. Please type a country name</p>
      }
  
      if(countries.length > 10){
        return <p>Too many matches. Please narrow your search</p>
      }

      if(countries.length <= 10 && countries.length > 1){
        return (
          <>
            {countries.map(country => (
              <p key={country.name.common}>{country.name.common}<button key={country.name.common} onClick={() => handleClick(country.name.common)}>Show Info</button></p>
            ))}
          </>
        )
      }
      
      const [singleCountry] = countries 
      const languages = Object.values(singleCountry.languages)

      return (
        <>
          <h1>{singleCountry.name.common}</h1>
          <p>Capital: {singleCountry.capital}</p>
          <p>Area: {singleCountry.area}</p>
          <h2>Languages</h2>
          <ul>
            {languages.map((language) => (<li key={language}>{language}</li>))}
          </ul>
          <DisplayCountryFlag png={singleCountry.flags.png} alt={singleCountry.flags.alt}/>
          <DisplayWeather cityName={singleCountry.capital} weather={weather} icon={weatherIcon}/>
        </>
      )
    }
  }

  export default DisplayCountries