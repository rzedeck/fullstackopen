const DisplayContact = ({ contact, erase }) => {
    return <p>{contact.name} {contact.number} <button onClick={() => erase(contact)}>Delete</button> </p>
  }

  export default DisplayContact