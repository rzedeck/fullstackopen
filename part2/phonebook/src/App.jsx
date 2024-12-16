import { useState, useEffect } from 'react'
import ContactFilter from './components/ContactFilter'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    noteService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
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
      noteService
      .create(contactObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
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
      <AddContact addContact={addContact} handlerName={handleNameChange} handlerNumber={handleNumberChange} newName={newName} newNumber={newNumber} />
      <ContactList contacts={filteredContacts} />
    </div>
  )
}

export default App