import { useState, useEffect } from 'react'
import axios from 'axios'
import ContactFilter from './components/ContactFilter'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
      setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    }
    
    if(persons.every(person => person.name !== contactObject.name)){
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }else{
      alert(`${contactObject.name} is already added to phonebook`)
    }

  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const filteredContacts = 
  persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactFilter handler={handleFilterChange} />
      <AddContact addContact={addContact} handlerName={handleNameChange} HandlerNumber={handleNumberChange} />
      <ContactList contacts={filteredContacts} />
    </div>
  )
}

export default App