const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
//const cors = require('cors')

//MIDDLEWARE
//morgan for logging HTTP requests
morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan('tiny'))
app.use(morgan(':body'))
app.use(morgan(':remote-addr'))

//built-in middleware to parse JSON bodies and serve static files
app.use(express.json()) //parse JSON request bodies
app.use(express.static('dist/phonebook')) //serve static files from the 'dist' directory

//custom middleware to log request details
// const requestLogger = (request, response, next) => {
//   console.log('IP:', request.ip)
//   //console.log('Path:  ', request.path)
//   //console.log('Body:  ', request.body)
//   //console.log('---')
//   next()
// }
// app.use(requestLogger)

//app.use(cors({ origin: 'http://localhost:5173' }))

//custom middleware to handle unknown endpoints
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
//app.use(unknownEndpoint)

//MONGOOSE SETUP
require('dotenv').config()
//const Note = require('./models/note')
const Person = require('./models/person')

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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
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

  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(500).json({ error: 'Failed to delete person' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  //Check for unique name and number
  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({
          error: 'name must be unique',
          code: 'name-duplicate'
        })
      }
      Person.findOne({ number: body.number })
        .then(existingNumber => {
          if (existingNumber) {
            return response.status(400).json({
              error: 'number must be unique',
              code: 'number-duplicate'
            })
          }
          const person = new Person({
            name: body.name,
            number: body.number,
          })

          person.save().then(savedPerson => {
            response.json(savedPerson)
          })
        })
    })
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
