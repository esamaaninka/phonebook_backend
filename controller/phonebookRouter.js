const phonebookRouter = require('express').Router();
const Phonebook = require('../models/phonebook_db');

phonebookRouter.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(result => {
    response.json(result.map(p => p.toJSON()))
    //console.log("got persons: ", result)
  })
})

phonebookRouter.get('/api/persons/:id', (request, response, next) => {
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


phonebookRouter.get('/info', (request, response, next) => {
  //console.log('info')
  const date = new Date()
  Phonebook.countDocuments()
    .then(result => {
      response.send(`<div><p>Phonebook has info for ${result} people.</p>
                      <p>${date}</p></div>`)
    })
    .catch(error => next(error))
})


phonebookRouter.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})



phonebookRouter.put('/api/persons/:id', (request, response, next) => {
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

phonebookRouter.post('/api/persons', (request, response, next) => {
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

module.exports = phonebookRouter
