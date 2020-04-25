import React from "react";

const Person = ({person, removeHandler}) => {
  return (<div>{person.name} - {person.number} <button onClick={() => removeHandler(person)}>delete</button></div>);
}

const PeopleList = ({persons, removeHandler}) => (
  persons.map(person => (<Person key={person.name} person={person} removeHandler={removeHandler}/>))
);

export default PeopleList;