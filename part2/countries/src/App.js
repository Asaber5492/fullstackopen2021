import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const filteredCountries =  countries.filter(country => country.name.official.toLowerCase().includes(searchItem.toLowerCase()))



  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])



const handleSearch = (event) => {
  setSearchItem(event.target.value)
}

const LanguageLister = ({ languages }) => {
  return(
    languages.map((languages) =>
    <li key={languages}>{languages}</li>
    )
    
  )
}

const FilterHandler = ({ filteredCountries }) => {
  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return(
      <div>
        {filteredCountries.map(country => 
        <CountryListItem key = {country.name.common} country={country} />
        )}
      </div>
    )
  }
  if (filteredCountries.length === 1) {
    const chosenCountry = filteredCountries[0]
    return(
      <div>
        <h1>{chosenCountry.name.common}</h1>
        <p>capital: {chosenCountry.capital[0]} </p>
        <p>population: {chosenCountry.population} </p>
        <h2>Languages</h2>
        <ul>
          <LanguageLister languages={Object.values(chosenCountry.languages)} />
        </ul>
        <div>
          {chosenCountry.flag}
        </div>

        <h3>Weather in {chosenCountry.capital} </h3>
        {/* I didn't want to make an account on that weather website for the
         API Key, sorry. Hypothetically, I'd write the following function, and
         format the returned JSON data to display like your example. 
        <p>
          <WeatherFetcher city={chosenCountry.capital} />
        </p>*/}
      </div>
    )
  }
  if (filteredCountries.length > 10) {
    return(
      <div>Too many matches, specify further filter</div>
    )
  }
  return(
    <div>
    </div>
  )
}

const CountryListItem = ({ country }) => {
  return (
    <div>
      <p>{country.name.common}
      <button onClick={() => setSearchItem(country.name.common)}>show Details</button>
      </p>
    </div>

  )
}


console.log("filteredCountries is ",{filteredCountries})
  return (
    <div> Find Countries: 
      <input
        value={searchItem}
        onChange={handleSearch}
      />
      <div>
        <FilterHandler filteredCountries={filteredCountries} />
      </div>
    </div>
    
  )
}

export default App