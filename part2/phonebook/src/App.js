import React, { useState } from "react";

const App = () => {
  // eslint-disable-next-line
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  // eslint-disable-next-line
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  );
};

export default App;
