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

const router = express.Router()
const router2 = express.Router()

const produtoController = require('./controller/produto.controller')
router.get('/', produtoController.get)
router.get('/:id', produtoController.getById)
router.post('/', produtoController.create)
router.put('/:id', produtoController.update)
router.delete('/:id', produtoController.remove)


const agendaController = require('./controller/agenda.controller')(knex)
router2.get('/', agendaController.get)
router2.get('/:id', agendaController.getById)
router2.post('/', agendaController.create)
router2.put('/:id', agendaController.update)
router2.delete('/:id', agendaController.remove)

app.use('/produtos/v1', router)
app.use('/agendas/v1', router2)

app.listen(PORT, HOST, () => {
  console.log('server running at http://0.0.0.0:8080')
})
