import DisplayContact from "./DisplayContact"

const ContactList = ({ contacts }) => {
    return (
        <>
            <h2>Numbers</h2>
            <>
                {contacts.map(person => <DisplayContact key={person.id} contact={person} />)}
            </>
        </>
    )
}

export default ContactList