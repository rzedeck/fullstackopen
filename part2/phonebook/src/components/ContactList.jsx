import DisplayContact from "./DisplayContact"

const ContactList = ({ contacts, handlerErase }) => {
    return (
        <>
            <h2>Numbers</h2>
            <>
                {contacts.map(person => <DisplayContact key={person.id} contact={person} erase={handlerErase}/>)}
            </>
        </>
    )
}

export default ContactList