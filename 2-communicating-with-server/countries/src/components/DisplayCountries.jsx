import WeatherData from "./WeatherData";

const DisplayCountries = ({ countries, selectedCountry, selectCountry, data }) => {
    if (selectedCountry) {
        const country = selectedCountry;
        return (
            <>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} km²</p>
                <h3>Languages:</h3>
                <ul>
                    {Object.values(country.languages).map(language => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
                <WeatherData 
                    selectedCountry={selectedCountry}
                    data={data}
                />
            </>
        )
    } else {
        if (2 <= countries.length && countries.length <= 10) {
            console.log(countries);
            return (
                <div>
                    <ul>
                        {countries.map(country => (
                            <li key={country.cca3}>{country.name.common} <button onClick={() => selectCountry(country)}>Show Details</button></li>
                        ))}
                    </ul>
                </div>
            );
        } else if (10 < countries.length && countries.length < 250) {
            return <p>Too many results, please narrow down your search.</p>;
        }
    }
}

export default DisplayCountries;