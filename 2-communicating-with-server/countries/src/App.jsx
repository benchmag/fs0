import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox.jsx'
import DisplayCountries from './components/DisplayCountries.jsx'
import countryDirectory from './services/directory.js'
import WeatherData from './components/WeatherData.jsx'

function App() {
  const [placeholder, setPlaceholder] = useState("... loading country list")
  const [searchText, setSearchText] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countryDirectory.getAllCountries()
      .then(data => {
        console.log("Fetched countries:", data)
        setCountries(data)
        setFilteredCountries(data)
        setPlaceholder("Search for a country...")
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching countries:", error)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      countryDirectory.getCapitalLatLon(selectedCountry.capital)
        .then(coords => {
          console.log("Fetched coordinates:", coords)
          return countryDirectory.getCapitalWeather(coords)
        })
        .then(weatherData => {
          setWeatherData(weatherData)
          console.log("Fetched weather data:", weatherData)
        })
        .catch(error => {
          console.error("Error fetching capital weather:", error)
        })
    }
  }, [selectedCountry]);

  const handleSearchChange = (event) => {
    setFilteredCountries([])
    setSelectedCountry(null);
    setWeatherData(null);
    setSearchText(event.target.value)
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredCountries(filtered)
    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    }
  }

  const handleCountrySelect = (country) => {
    countryDirectory.getCountryByName(country.name.common)
      .then(data => {
        console.log("Fetched country details:", data)
        setSelectedCountry(data);
        setFilteredCountries(data);
      })
      .catch(error => {
        console.error("Error fetching country details:", error)
      })
  }

  

  return (
    <div>
      <h1>Countries of the world</h1>
      <p>Find out about the world you live in!</p>
      <SearchBox 
        value={searchText} 
        onChange={handleSearchChange} 
        placeholder={placeholder}
        loading={loading} />
      <DisplayCountries 
        countries={filteredCountries} 
        selectedCountry={selectedCountry}
        selectCountry={handleCountrySelect}
        setSelectedCountry={setSelectedCountry}
        data={weatherData}
      />
    </div>
  )
}

export default App