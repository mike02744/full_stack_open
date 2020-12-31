import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [check, setCheck] = useState("");
  const [names, setNames] = useState(
    new Set(persons.map((person) => person.name))
  );

  useEffect(() => {
    // effect
    axios.get("http://localhost:3001/persons").then((Response) => {
      setPersons(Response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (names.has(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNames(names.add(newName));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleCheckChange = (e) => {
    setCheck(e.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(check.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter check={check} handleCheckChange={handleCheckChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <form>
      filter shown with:
      <input value={props.check} onChange={props.handleCheckChange} />
    </form>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  let i = 0;
  return (
    <ul>
      {persons.map((person) => (
        <li key={++i}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default App;
