const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//NOTES API ENDPOINTS
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
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

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

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

  console.log(request)

  response.send(
    `<p>Phonebook has info for ${phonebookLength} people</p>
    <p>${date}</p>`
  )  
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})