import React, { useState, useEffect } from "react";
import personsService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [check, setCheck] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.filter((person) => person.name === newName).length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        personsService
          .update(id, personObject)
          .then((response) => {
            const temp = persons.map((person) =>
              person.id !== id ? person : response.data
            );
            setNewName("");
            setNewNumber("");

            setPersons(temp);
            setMessage({
              text: `${newName} was modified`,
              className: "notification",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error.response.data);
            setMessage({
              // text: `${newName} was removed from server`,
              text: error.response.data.error,
              className: "error",
            });
            // const temp = persons.filter((person) => person.id !== id);
            // setPersons(temp);
          });
      }
    } else {
      personsService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setMessage({
            text: `${newName} was added`,
            className: "notification",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setMessage({
            text: error.response.data.error,
            className: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const remove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          const temp = persons.filter((person) => person.id !== id);
          setPersons(temp);
        })
        .catch(() => {
          setMessage({
            text: `${name} was already removed from server`,
            className: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          const temp = persons.filter((person) => person.id !== id);
          setPersons(temp);
        });
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
      <Notification message={message} />
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
      <Persons persons={personsToShow} remove={remove} />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className={message.className}>{message.text}</div>;
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

const Persons = ({ persons, remove }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => remove(person.id, person.name)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default App;
