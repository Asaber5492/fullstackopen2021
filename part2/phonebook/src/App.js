import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import axios from 'axios'
import personsservice from './services/persons'





const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const filteredPersons = showAll    ? persons    : persons.filter(person => person.name.toLowerCase().includes(searchItem.toLowerCase()))




  

  useEffect(() => {   
    personsservice      
      .getAll()      
      .then(initialPersons => {        
        setPersons(initialPersons)      
      }) 
    }, [])


  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons.map(person => person.name).indexOf(newName)+1)
    const id = persons.map(person => person.name)
      .indexOf(newName)+1
    if(persons.map(person => person.name).includes(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook. Replace old number with new number?`)
      if (result) {
        const personObject = {
          name: newName,
          number: newNumber 
        }
        personsservice      
        .update(id, personObject)      
        .then(returnedPerson => {        
          setPersons(persons.map(person => person.id !== id ? person : personObject))      
        })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personsservice      
      .create(personObject)      
      .then(initialPersons => {        
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')   
        setErrorMessage(
          `Added '${personObject.name}'`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    }

  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleSearch = (event) => {
    setSearchItem(event.target.value)
    if(event.target.value.length === 0) {
      setShowAll(true)
    }
    else {
      setShowAll(false)
    }
  
  }




  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Search</h3>
      <Search searchItem={searchItem} handleSearch={handleSearch} />
      
      <h3>Add New</h3>
      <PersonForm addPerson={addPerson} 
        newName={newName} handleNewName={handleNewName} 
        newNumber={newNumber} handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Person filteredPersons={filteredPersons} />

    </div>
  )
}

export default App