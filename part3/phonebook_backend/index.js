const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  });
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
    const currentTime = new Date().toString()
    const numberOfEntries = persons.length

    const infoMessage = `<p>Phonebook has info for ${numberOfEntries} people</p>`
    const timeMessage = `<p>${currentTime}</p>`
  
    response.send(infoMessage + timeMessage)
  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
  
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
  
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})