
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
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

app.delete('/api/persons/:id', (request, response) => {
    //console.log('Deleting: ', request.params.id)
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
  }

    //let value = Math.random() * (4-1) + 1
    //console.log('randomii: ', getRandomInt(1,100))


const generateId = () => {
   let id = getRandomInt(1,100)

   // if all id -space used error not handled -> infite loop
   while(persons.some(p => p.id === id)) id = getRandomInt(1,100)
   
   return id
  }


  
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    console.log('Person ', person)
    persons = persons.concat(person)
      
    response.json(person)
  })

const port = 3003
app.listen(port)
console.log(`Server running on port ${port}`)