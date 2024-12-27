import { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import DisplayCountries from './components/DisplayCountries'
import axios from 'axios'

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [allCountriesList, setAllCountriesList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const inputDelay = 500

  // Fetch all countries initially
  useEffect(() => {
    console.log('Fetching country list...')
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
      setFilteredCountries([]);
    } else {
      const filtered = allCountriesList.filter(country =>
        country.name.common.toLowerCase().includes(filter)
      );
      setFilteredCountries(filtered);
    }
  }, inputDelay);

    return () => clearTimeout(timeoutId)
  }, [newFilter, allCountriesList])
/*
  // Handle precise single-country fetch
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const [singleCountry] = filteredCountries
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${singleCountry.name.official}`)
        .then(response => {
          console.log('Single Country data:', response.data)
        })
        .catch(error => {
          console.error('Error fetching single country data:', error)
        })
    }
  }, [filteredCountries])*/

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <>
      <CountryFilter handler={handleFilterChange} />
      <DisplayCountries countries={filteredCountries} />
    </>
  )
}

export default App