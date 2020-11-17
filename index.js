require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const phonebookRouter = require('./controller/phonebookRouter')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

var morgan = require('morgan')
//app.use(morgan('tiny'))
morgan.token('body', function (request, /*response*/) { return (JSON.stringify(request.body)) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(phonebookRouter)

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
