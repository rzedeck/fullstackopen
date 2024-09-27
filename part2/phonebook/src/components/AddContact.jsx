const AddContact = ({ addContact, handlerName, HandlerNumber }) => {
    return (
        <>
            <h2>Add a new contact</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input onChange={handlerName} />
                </div>
                <div>
                    number: <input onChange={HandlerNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddContact