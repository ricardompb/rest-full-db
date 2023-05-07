require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 8080
const HOST = '0.0.0.0'
const config = require('../knexfile')

const knex = require('knex')({
  ...config.production
})

const morgan = require('morgan')

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

const produtoRouter = express.Router()
const agendaRouter = express.Router()
const segurancaRouter = express.Router()

const produtoController = require('./controller/produto.controller')
produtoRouter.get('/', produtoController.get)
produtoRouter.get('/:id', produtoController.getById)
produtoRouter.post('/', produtoController.create)
produtoRouter.put('/:id', produtoController.update)
produtoRouter.delete('/:id', produtoController.remove)

const agendaController = require('./controller/agenda.controller')(knex)
agendaRouter.get('/', agendaController.get)
agendaRouter.get('/:id', agendaController.getById)
agendaRouter.post('/', agendaController.create)
agendaRouter.put('/:id', agendaController.update)
agendaRouter.delete('/:id', agendaController.remove)

const segurancaController = require('./controller/seguranca.controller')(knex)
segurancaRouter.post('/register', segurancaController.register)
segurancaRouter.post('/login', segurancaController.login)

app.use('/produtos/v1', produtoRouter)
app.use('/agendas/v1', agendaRouter)
app.use('/seguranca', )

app.listen(PORT, HOST, () => {
  console.log('server running at http://0.0.0.0:8080')
})
