const AddContact = ({ addContact, handlerName, handlerNumber, newName, newNumber }) => {
    return (
        <>
            <h2>Add a new contact</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handlerName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handlerNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddContact