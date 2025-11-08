import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const weatherApiKey = import.meta.env.VITE_weatherkey;

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
}

const getCountryByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((response) => response.data);
}

const getCapitalLatLon = (capital) => {
  const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${weatherApiKey}`;
  const request = axios.get(geoCodeURL)
  return request.then((geoResponse) => {
    const { lat, lon } = geoResponse.data[0];
    return { lat, lon };
  });
}

const getCapitalWeather = ({ lat, lon }) => {
  const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
  const request = axios.get(weatherURL);
  return request.then((weatherResponse) => weatherResponse.data);
}

export default { getAllCountries, getCountryByName, getCapitalLatLon, getCapitalWeather };