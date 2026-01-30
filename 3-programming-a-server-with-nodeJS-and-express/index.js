const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')

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
const requestLogger = (request, response, next) => {
  console.log('IP:', request.ip)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
// app.use(requestLogger)

//MONGOOSE SETUP
require('dotenv').config()
//const Note = require('./models/note')
const Person = require('./models/person')


//HOME ENDPOINT
app.get('/', (request, response) => {
  response.status(200)
  response.send('<h1>Hello World!</h1>')
})

app.get('/notes', (request, response) => {
  // Served by express.static middleware above
})

//NOTES API ENDPOINTS//
//..............//

//GET
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {

      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

//POST
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

//PUT
app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
    id: id
  }
  Note.findByIdAndUpdate(request.params.id, note, { new: true , runValidators: true})
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

//PATCH

//DELETE
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

//PERSONS API ENDPOINTS
//..............//

//GET
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
  })

//POST
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

//PUT
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true , runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

//PATCH

//DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  console.log(`deleting id ${request.params.id}`)
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//INFO ENDPOINTS
app.get('/info', (request, response) => {
  const phonebookLength = Person.length
  const date = new Date()

  response.send(
    `<p>Phonebook has info for ${phonebookLength} people</p>
    <p>${date}</p>`
  )  
})

//custom middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
//app.use(unknownEndpoint)

//custom error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
