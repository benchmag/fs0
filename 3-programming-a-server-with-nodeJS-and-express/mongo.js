const mongoose = require('mongoose')

//console.log('process.argv:', process.argv.length)

if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://bcheeth94_db_user:${password}@cluster0.dqimbci.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`
   
  //console.log('connecting to', url)
  mongoose.set('strictQuery',false)
  mongoose.connect(url, { family: 4 })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)
  
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()      
    })

  })
  return
}

if (process.argv.length < 5) {
  console.log('give password, name, and number as arguments')
  process.exit(1)
}

password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
const url = `mongodb+srv://bcheeth94_db_user:${password}@cluster0.dqimbci.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//     console.log(result)
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber,
})

person.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
})