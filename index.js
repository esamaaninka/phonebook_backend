require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Phonebook = require('./models/phonebook_db')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

var morgan = require('morgan')
//app.use(morgan('tiny'))
morgan.token('body', function (req, res) { return (JSON.stringify(req.body)) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
      Phonebook.find({}).then(result => {
        res.json(result.map(p => p.toJSON()))
        console.log("got persons: ", result)
      })
})

app.get('/api/persons/:id', (request, response, next) => {
    Phonebook.findById(request.params.id)
    .then(person => {
      //console.log(person)
      if(person){
        response.json(person.toJSON())
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})

/*
app.get('/info', (req, res) => {
    //console.log('info')
    const count = persons.length
    const date = new Date()

    res.send(`<div><p>Phonebook has info for ${count} people.</p>
                <p>${date}</p></div>`)
})
*/
app.delete('/api/persons/:id', (request, response, next) => {
    Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
/*
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
  }
*/
/*
const generateId = () => {
   let id = getRandomInt(1,100)

   // if all id -space used error not handled -> infite loop
   while(persons.some(p => p.id === id)) id = getRandomInt(1,100)
   
   return id
  }
*/

// HOX tämä vasta 3.17 harjoituksessa! 
//app.put()  

app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log('POST adding to body', body.name)
    if (!body || !body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    const person = new Phonebook ({
        name: body.name,
        number: body.number,
     })
  
     person.save().then(savedPerson => {
        //console.log('phonebook saved!', savedPerson)
        response.json(savedPerson.toJSON())
        })
        
 })


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error('ErrorHandler: ', error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
