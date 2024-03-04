const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.jxtnwqd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String, 
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
    
    console.log(`added ${name} number ${number} to phonebook`)

    } else if (process.argv.length == 3) {

    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
    } else {
        console.log("Please type details in correct format.")
        console.log("Make sure to enclose the name in quotes if it contains whitespace.")
        process.exit(1)
    }