import { useState, useEffect } from 'react'
import ContactFilter from './components/ContactFilter'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [userNotification, setUserNotification] = useState(null)
  const [notifType, setNotifType] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    
    if(persons.every(person => person.name !== contactObject.name)){
      personService
      .create(contactObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        setUserNotification(`Added ${returnedContact.name}`)
        setNotifType('success')
        setTimeout(() => {
          setUserNotification(null)
        }, 5000)
      })
    }else{
      if (window.confirm(`${contactObject.name} is already added to phonebook, replace the old number with the new one ?`)) {
        const contacUpdateObj = persons.find(person => person.name === contactObject.name)
        personService
        .update(contacUpdateObj.id, contactObject)
        .then(updatedContact => {
          setPersons(persons.map(person => person.id !== updatedContact.id ? person : updatedContact))
          setNewName('')
          setNewNumber('')
          setUserNotification(`Changed ${updatedContact.name}`)
          setNotifType('success')
          setTimeout(() => {
            setUserNotification(null)
          }, 5000)
        })
        .catch(error => {
          setUserNotification(`Contact '${contactObject.name}' was already removed from server`)
          setNotifType('error')
          setTimeout(() => {
            setUserNotification(null)
          }, 5000)
          console.log('error:',error)
          setPersons(persons.filter(p =>p.name !== contactObject.name))
        })
      }
    }
  }

  const handleEraseContact = (contact) => {
    console.log('Contact', contact)
    if (window.confirm(`Do you really want to delete ${contact.name}?`)) {
      personService
      .erase(contact.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== contact.id))
        setUserNotification(`Erased ${contact.name}`)
        setNotifType('success')
        setTimeout(() => {
          setUserNotification(null) 
        }, 5000)
      })
      console.log('Person State', persons)
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
      <Notification notification={userNotification} type={notifType}/>
      <ContactFilter handler={handleFilterChange} />
      <AddContact addContact={addContact} handlerName={handleNameChange} handlerNumber={handleNumberChange} newName={newName} newNumber={newNumber} />
      <ContactList contacts={filteredContacts} handlerErase={handleEraseContact}/>
    </div>
  )
}

export default App