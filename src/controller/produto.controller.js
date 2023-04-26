const ProdutoModel = require('../models/produto.model')

module.exports = {
  get (req, res) {
    res.send(ProdutoModel.produtos)
  },
  getById (req, res) {
    const { id } = req.params
    const produto = ProdutoModel.produtos.find(x => x.id === parseInt(id))
    if (produto) {
      return res.send(produto)
    }
    return res.send({ message: 'Produto não encontrado' })
  },
  create (req, res) {
    const id = ProdutoModel.produtos.length + 1
    delete req.body.id
    const produto = { id, ...req.body }
    ProdutoModel.produtos.push(produto)
    res.send(produto)
  },
  update (req, res) {
    const { id } = req.params
    const index = ProdutoModel.produtos.findIndex(x => x.id === parseInt(id))
    if (index > -1) {
      req.body.id = id
      ProdutoModel.produtos[index] = req.body
      return res.send(ProdutoModel.produtos)
    }
    return res.send({ message: 'Produto não encontrado' })
  },
  remove (req, res) {
    const { id } = req.params
    const index = ProdutoModel.produtos.findIndex(x => x.id === parseInt(id))
    if (index > -1) {
      ProdutoModel.produtos.splice(index, 1)
      return res.send(ProdutoModel.produtos)
    }
    return res.send({ message: 'Produto não encontrado' })
  }
}
