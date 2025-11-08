const WeatherData = ({ selectedCountry, data }) => {
  if (!data) {
    return;
  } else {
    return (
      <div>
        <h3>Weather in {selectedCountry.capital}</h3>
        <p>Temperature: {data.current.temp}°C</p>
        <p>Weather: {data.current.weather[0].description}</p>
      </div>
    );
  }
}

export default WeatherData;