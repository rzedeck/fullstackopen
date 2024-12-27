import DisplayCountryFlag from "./DisplayCountryFlag"

const DisplayCountries = ({ countries }) => {
    if(countries){
      console.log('countries length', countries.length)
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
              <p key={country.name.common}>{country.name.common}</p>
            ))}
          </>
        )
      }
      
      const [singleCountry] = countries 
      console.log('single country:', singleCountry)
      
      const languages = Object.values(singleCountry.languages)
      console.log('single country languages:', languages)
      return (
        <>
          <h1>{singleCountry.name.common}</h1>
          <p>Capital: {singleCountry.capital}</p>
          <p>Population: {singleCountry.population}</p>
          <ul>
            {languages.map((language) => (<li key={language}>{language}</li>))}
          </ul>
          <DisplayCountryFlag png={singleCountry.flags.png} alt={singleCountry.flags.alt}/>
        </>
      )
    }
  }

  export default DisplayCountries