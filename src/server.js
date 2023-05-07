require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 8080
const HOST = '0.0.0.0'
const config = require('../knexfile')

const knex = require('knex')({
  ...config.developer
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

const segurancaController = require('./controller/seguranca.controller')(knex)
const { register, login, authorization, isAdmin } = segurancaController
segurancaRouter.post('/register', register)
segurancaRouter.post('/login', login)

const produtoController = require('./controller/produto.controller')
produtoRouter.get('/', authorization, isAdmin, produtoController.get)
produtoRouter.get('/:id', authorization, isAdmin, produtoController.getById)
produtoRouter.post('/', authorization, isAdmin, produtoController.create)
produtoRouter.put('/:id', authorization, isAdmin, produtoController.update)
produtoRouter.delete('/:id', authorization, isAdmin, produtoController.remove)

const agendaController = require('./controller/agenda.controller')(knex)
agendaRouter.get('/', authorization, isAdmin, agendaController.get)
agendaRouter.get('/:id', authorization, isAdmin, agendaController.getById)
agendaRouter.post('/', authorization, isAdmin, agendaController.create)
agendaRouter.put('/:id', authorization, isAdmin, agendaController.update)
agendaRouter.delete('/:id', authorization, isAdmin, agendaController.remove)

app.use('/produtos/v1', produtoRouter)
app.use('/agendas/v1', agendaRouter)
app.use('/seguranca', segurancaRouter)

app.listen(PORT, HOST, () => {
  console.log('server running at http://0.0.0.0:8080')
})
