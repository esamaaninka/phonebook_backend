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
morgan.token('body', function (request, response) { return (JSON.stringify(request.body)) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(result => {
    response.json(result.map(p => p.toJSON()))
    //console.log("got persons: ", result)
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


app.get('/info', (request, response, next) => {
  //console.log('info')
  const date = new Date()
  Phonebook.countDocuments()
    .then(result => {
      response.send(`<div><p>Phonebook has info for ${result} people.</p>
                      <p>${date}</p></div>`)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})



app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  //console.log('Putting: ', body)

  const person = {
    name: body.name,
    number: body.number,
  }
  Phonebook.findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  //console.log('POST adding to body', body.name)
  //if (!body || !body.name || !body.number) {
  //return response.status(400).json({
  //error: 'content missing'
  // })
  // }

  const person = new Phonebook ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
  //console.log('phonebook saved!', savedPerson)
    response.json(savedPerson.toJSON())
  })

    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error('ErrorHandler: ', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
