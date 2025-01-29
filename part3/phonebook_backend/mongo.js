const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const contactName = process.argv[3]

const contactNumber = process.argv[4]

if (contactName && !contactNumber) {
    console.log('Contact name AND number must be provided')
    process.exit(1)
}

const url =
    `mongodb+srv://rzedeck:${password}@cluster0.hfvxs.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

//fetch all data
if (!contactName && !contactNumber) {
    Person.find({}).then(result => {
        if(result.length == 0){
            console.log('Phonebook: \n No contacts added yet')
        }else{
            console.log('Phonebook:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
        }
        
        mongoose.connection.close()
    })
    //process.exit(0)
}

//insert new contact
if (contactName && contactNumber) {

    const person = new Person({
        name: contactName,
        number: contactNumber,
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}