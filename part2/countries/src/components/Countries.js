import React from "react";
import Country from "./Country";
const Countries = ({ countries, handleSelect }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length <= 10) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.numericCode}>
            <p>{country.name}</p>
            <button onClick={() => handleSelect((country = { country }))}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches</p>;
  }
};

export default Countries;
