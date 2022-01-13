import React from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const deletePerson = (person) => {
    axios.delete(`${baseUrl}/${person.id}`)
        .then(console.log(person.id, "deleted"))
}

const deletionHandler = (person) => {
    const result = window.confirm(`Are you sure you want to delete '${person.name}?`)
    if (result) {
      deletePerson(person)
      .then(console.log(`'${person.name}' deleted!`))
      .catch(error => {
        alert(
          `Person with id '${person.id}' not found!`
        )
      })
    }
  }




const Person = ({ filteredPersons }) => {
    return (
        <ul>
            {filteredPersons.map(person => 
                <PersonListItem key = {person.name} person={person} />
            )}
        </ul>
    )
}

const PersonListItem = ({ person }) => {
    console.log(person)
    return (
      <li>{person.name}: {person.number}
      <button onClick={() => {deletionHandler(person)}} >delete?</button>
      </li>
    )
  }
  
export default Person