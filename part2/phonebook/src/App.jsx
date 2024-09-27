import { useState } from 'react'
import ContactFilter from './components/ContactFilter'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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