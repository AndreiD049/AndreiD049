import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PeopleList from "./components/PeopleList";
import PhoneBookFilter from "./components/PhoneBookFilter";
import PhonebookForm from "./components/PhonebookForm";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  let personsToShow = filterValue ?
                      filterBy(filterValue) :
                      persons;
  
  // fetch data on startup
  useEffect(() => {
    personsService
      .getAll()
        .then(persons => {
          setPersons(persons);
        })
  }, []);
  
  // controlled input + filter value
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    filterBy(value);
  }

  function filterBy(value) {
    // pattern for matching the filtered value
    const regExp = new RegExp(`.*${value}.*`, "i");
    // return a new array with only filtered people
    const filteredList = persons.filter((person) => {
      return regExp.test(person.name);
    });
    return filteredList;
  }

                      
  const validatePerson = (name) => {
    return !persons.find(person => person.name === name)
  }

  const validateNumber = (number) => {
    const regExp = /^\+?\d*\(?\d+\)?[\d-\s]+$/gi;
    return regExp.test(number);
  }

  const sanitizeNumber = (number) => {
    const regExp = /[^\d+]/gi;
    return newNumber.replace(regExp, "");
  }

  const handlePersonRemove = (person) => {
    const answer = window.confirm(`Remove ${person.name}?`);
    if (answer) {
      personsService
        .remove(person.id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== person.id));
          })
          .catch(err => alert(`Error deleting person with id ${person.id}`));
    }
  }

  const handlePersonUpdate = (id, newPerson) => {
    personsService
      .update(id, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === id ? updatedPerson : person));
        });
  }

  const handlePersonAdd = (e) => {
    function cleanup() {
      setNewName("");
      setNewNumber("");
      setFilterValue("");
    }

    e.preventDefault();
    
    // do nothing if the input is empty
    if (!newName) return;
    
    let newPerson = {
      name: newName,
      number: sanitizeNumber(newNumber)
    };

    if (!validatePerson(newName)) {
      if (window.confirm(`${newName} is already in the list. Replace the old number with a new one?`)) {
        const currentPerson = persons.find(person => person.name === newName);
        handlePersonUpdate(currentPerson.id, newPerson);
        cleanup();
      }
      return;
    }
    if (!validateNumber(newNumber)) {
      alert(`${newNumber} is not valid.`);
      return;
    }
    personsService
      .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          cleanup();
        });
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <PhoneBookFilter handleFilter={handleFilter} filterValue={filterValue}/>

      <h2>Add new:</h2>

      <PhonebookForm newName={newName} 
                     handleNameChange={handleNameChange} 
                     newNumber={newNumber} 
                     handleNumberChange={handleNumberChange} 
                     handleSubmit={handlePersonAdd} 
      />

      <h2>Numbers</h2>
      
      <PeopleList persons={personsToShow} removeHandler={handlePersonRemove}/>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);