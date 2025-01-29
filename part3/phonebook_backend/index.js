require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))

app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :body'))

app.use(cors())

app.get('/', (request, response) => {
  const reqDate = new Date().toString()
  response.send(`<p>Pronebook has info for ${persons.length} people <br/> ${reqDate}</p>`)
})

app.get('/api/person', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/person/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/person', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedContact => {
    response.json(savedContact)
  })
})

app.delete('/api/person/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)