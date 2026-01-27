const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
//const cors = require('cors')

//MIDDLEWARE
morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan('tiny'))
app.use(morgan(':body'))
app.use(morgan(':remote-addr'))

app.use(express.json())
app.use(express.static('dist/dist_pb'))
//app.use('/phonebook', express.static(path.join(__dirname, 'dist_pb'), { index: 'index.html' }))

const requestLogger = (request, response, next) => {
  console.log('IP:', request.ip)
  //console.log('Path:  ', request.path)
  //console.log('Body:  ', request.body)
  //console.log('---')
  next()
}
//app.use(requestLogger)

//app.use(cors({ origin: 'http://localhost:5173' }))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
//app.use(unknownEndpoint)

//MONGOOSE SETUP
require('dotenv').config()
const Note = require('./models/note')

// const mongoose = require('mongoose')

// // DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const password = process.argv[2]
// const url = `mongodb+srv://bcheeth94_db_user:${password}@cluster0.dqimbci.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery',false)
// mongoose.connect(url, { family: 4 })

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)


//HOME ENDPOINT

app.get('/', (request, response) => {
  response.status(200)
  response.send('<h1>Hello World!</h1>')
})

app.get('/notes', (request, response) => {
  // Served by express.static middleware above
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// //NOTES API ENDPOINTS
// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// app.get('/api/notes/:id', (request, response) => {
//   const id = request.params.id
//   const note = notes.find(note => note.id === id)

//   if (note) {
//     response.status(200)
//     response.json(note)
//   } else {
//     response.status(404)
//     response.send(
//       `<h1>404 Not Found</h1>
//       <p>Do a proper request</p>`
//     )
//   }
// })

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   }

//   notes = notes.concat(note)

//   response.json(note)
// }) 

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
    id: id
  }
  notes = notes.map(n => n.id !== id ? n : note)

  response.json(note)
})

//PERSONS API ENDPOINTS
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  console.log(request.ip)
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }

  if (person) {
    response.send(
      `<h1>${person.name}:</h1>
      <p>${person.number}</p>`
    )
  } else {
    response.status(404)
    response.send(
      `<h1>404 Not Found</h1>
      <p>Do a proper request</p>`
    )
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const dead_man_walking = persons.find(person => person.id === id)
  const name = dead_man_walking.name
  if (dead_man_walking !== undefined) {
    persons = persons.filter(person => person.id !== id)
    console.log(`${name}`)
    response.send(
      `<h1>Deleted</h1>
      <p>${name} has been deleted from the phonebook</p>`
    )
  } else {
    response.status(404)
    response.send(
      `<h1>404 Not Found</h1>
      <p>Do a proper request</p>`
    )
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const nameExists = persons.find(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const numberExists = persons.find(person => person.number === body.number)
  if (numberExists) {
    return response.status(400).json({
      error: 'number must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.floor(Math.random() * 10000))
  }

  persons = persons.concat(person)

  response.json(person)
})

//INFO ENDPOINTS
app.get('/info', (request, response) => {
  const phonebookLength = persons.length
  const date = new Date()

  response.send(
    `<p>Phonebook has info for ${phonebookLength} people</p>
    <p>${date}</p>`
  )  
})


const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
