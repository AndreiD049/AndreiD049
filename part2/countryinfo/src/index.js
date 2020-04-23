import React, {useState, useEffect} from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';


const LanguageList = ({languages}) => {
  return (
    <ul>
      {languages.map(language => (<li key={language.iso639_1}>{language.name} ({language.nativeName})</li>))}
    </ul>
  );
}

const WeatherDisplay = ({country, weather}) => {
  if (weather.hasOwnProperty('current')) {
    return (
      <div>
        <h4>Weather in {country.capital}</h4>
        <h5>{weather.current.weather_descriptions[0]}</h5>
        <p>Temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons[0]} alt="weather icon"/>
        <p>Wind: {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}</p>
      </div>
    );
  } else {
    return null;
  }
}

const CountryDetails = ({country}) => {
  const accessKey = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({});
  // Query data for the capital
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(err => {
          alert(`Error fetching weather data. ${err.message}`);
        });
  }, [country.capital, accessKey]);

  return (
    <div>
      <h3>{country.name}</h3>
      <br/>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <br/>
      <h4>Languages</h4>
      <LanguageList languages={country.languages}/>
      <img src={country.flag} height="100px" alt={`Flag of ${country.name}`} title={`Flag of ${country.name}`}/>
      <WeatherDisplay country={country} weather={weather}/>
    </div>
  );
}

const CountryListItem = ({country}) => {
  const [shown, setShown] = useState(false);

  return (
    <div key={country.name}>
      {country.name} <button onClick={() => {setShown(!shown)}}>{shown ? 'hide' : 'show'}</button>
      {shown ? <CountryDetails country={country}/> : null }
    </div>
  );
}

const CountryList = ({countries}) => {

  return (
    countries.map(country => {
      return (
        <CountryListItem key={country.name} country={country}/>
      );
    })
  );
}

const CountryDisplay = ({countries}) => {
  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter.</div>);
  } else if (countries.length === 1) {
    return (<CountryDetails country={countries[0]}/>);
  } else {
    return (<CountryList countries={countries} />);
  }
}

const App = () => {
  const [findCountry, setFindCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const visibleCountries = findCountry ? getFilteredCountries() : countries; 

  // fetch data from api
  useEffect(fetchCountries, []);

  function fetchCountries() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
        .then((responce) => {
          setCountries(responce.data);
        })
        .catch((err) => {
          alert(`Error occured: ${err.message}`);
        });
  }

  function getFilteredCountries() {
    const pattern = new RegExp(`.*${findCountry}.*`, 'i');
    const exactPattern = new RegExp(`^${findCountry}$`, 'i');
    const checkFullnames = countries.filter(country => exactPattern.test(country.name));
    return checkFullnames.length ? checkFullnames : countries.filter(country => pattern.test(country.name));
  }

  function handleFilterChange(e) {
    setFindCountry(e.target.value);
  }

  return (
    <div>
      <div>Find countries: <input value={findCountry} onChange={handleFilterChange} /></div>
      <CountryDisplay countries={visibleCountries}/>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);