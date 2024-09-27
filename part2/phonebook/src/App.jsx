import { useState } from 'react'

const DisplayContact = ({ contact }) => {
  //console.log('contact', contact.name)
  return <p>{contact.name}</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      id: String(persons.length + 1),
      name: newName
    }
    
    if(persons.every(person => person.name !== contactObject.name)){
      setPersons(persons.concat(contactObject))
      setNewName('')
    }else{
      alert(`${contactObject.name} is already added to phonebook`)
    }

  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map(person => {
          //console.log(person);
          return (
            <DisplayContact key={person.id} contact={person} />
          );
        })}
      </>

    </div>
  )
}

export default App