import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  // eslint-disable-next-line
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((Response) => setCountries(Response.data));
  }, []);

  const countriesToShow =
    selected.length === 0
      ? countries.filter((country) =>
          country.name.toLowerCase().includes(input.toLowerCase())
        )
      : selected;

  const handleSelect = ({ country }) => {
    setSelected([country]);
  };

  const handleInput = (e) => {
    if (selected.length === 1) {
      setSelected([]);
    }
    return setInput(e.target.value);
  };

  return (
    <div>
      Find countries:
      <input value={input} onChange={handleInput} />
      <Countries
        countries={countriesToShow}
        handleSelect={handleSelect}
        input={input}
      />
    </div>
  );
}

export default App;
