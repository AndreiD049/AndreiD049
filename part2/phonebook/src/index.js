import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import PeopleList from "./components/PeopleList";
import PhoneBookFilter from "./components/PhoneBookFilter";
import PhonebookForm from "./components/PhonebookForm";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  let personsToShow = filterValue ?
                      filterBy(filterValue) :
                      persons;
  
  // fetch data on startup
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
        .then(response => {
          setPersons(response.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName) return;
    if (!validatePerson(newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }
    if (!validateNumber(newNumber)) {
      alert(`${newNumber} is not valid.`);
      return;
    }
    let newPerson = {
      name: newName,
      number: sanitizeNumber(newNumber)
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
    setFilterValue("");
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
                     handleSubmit={handleSubmit} 
      />

      <h2>Numbers</h2>
      
      <PeopleList persons={personsToShow}/>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);