import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({
    main: { temp: "" },
    weather: [],
    wind: {
      speed: 0,
      deg: 0,
    },
  });

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const promise = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
    );
    promise.then((Response) => setWeather(Response.data));
  }, [country.capital]);

  return (
    <>
      <h1>{country.name}</h1>
      <p>
        <b>Capital:</b> {country.capital}
      </p>
      <p>
        <b>Population:</b> {country.population}
      </p>
      <h2>Language</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`${country.name} Flag`} width="200" />
      <h2>Weather in {country.capital}</h2>
      <p>
        <b>Temperature:</b> {weather.main.temp} Celcius
      </p>

      {weather.weather.map((w) => {
        return (
          <img
            src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
            alt="icon/"
          />
        );
      })}
      <p>
        <b>Wind:</b> {weather.wind.speed} m/s {weather.wind.deg} degree
      </p>
    </>
  );
};

export default Country;
