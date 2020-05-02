
const express = require('express')
const app = express()

app.use(express.json())

const persons = [
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "Arto Hellas",
        number: "050-123456",
        id: 11
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 12
    }
]



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(p => {
        return p.id === id
    })
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  
})

app.get('/info', (req, res) => {
    //console.log('info')
    const count = persons.length
    const date = new Date()

    res.send(`<div><p>Phonebook has info for ${count} people.</p>
                <p>${date}</p></div>`)
})


const port = 3003
app.listen(port)
console.log(`Server running on port ${port}`)