import { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import DisplayCountries from './components/DisplayCountries'
import axios from 'axios'

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [weather, setWeather] = useState({})
  const [allCountriesList, setAllCountriesList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const api_key = import.meta.env.VITE_W_API_KEY
  const inputDelay = 500

  // Fetch all countries initially
  useEffect(() => {
    //todo service
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountriesList(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  // Filter countries based on the search term
  useEffect(() => {
   if (!allCountriesList.length) return

   const filter = newFilter.toLowerCase()
   const timeoutId = setTimeout(() => {
    if (filter === '') {
      setFilteredCountries([])
    } else {
      const filtered = allCountriesList.filter(country =>
        country.name.common.toLowerCase().includes(filter)
      );
      setFilteredCountries(filtered)
    }
  }, inputDelay)

    return () => clearTimeout(timeoutId)
  }, [newFilter, allCountriesList])

  // Handle capital weather report fetch
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const [{ capitalInfo: { latlng: [lat, lon] } }] = filteredCountries
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.error('Error fetching single country data:', error)
        })
    }
  }, [filteredCountries, api_key])

  //todo check the condition !==0
  useEffect(() => {
    if (Object.keys(weather).length !== 0){
      const [{ icon }] = weather.weather 
      setWeatherIcon(`https://openweathermap.org/img/wn/${icon}@2x.png`)
    }
  }, [weather])

  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleShowInfoClick = (countryName) => setNewFilter(countryName)

  return (
    <>
      <CountryFilter handler={handleFilterChange} />
      <DisplayCountries countries={filteredCountries} weather={weather} weatherIcon={weatherIcon} handleClick={handleShowInfoClick}/>
    </>
  )
}

export default App