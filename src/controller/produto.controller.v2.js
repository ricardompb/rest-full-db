
module.exports = (knex) => {
  return {
    async get (req, res) {
      const produtos = await knex.select('*').from('produto')
      res.json(produtos)
    },
    async getById (req, res) {
      const produtos = await knex.select('*').from('produto').where('id', '=', req.params.id)
      const [produto] = produtos
      if (!produto) return res.json({ message: 'Produto não encontrado.' })
      res.json(produto)
    },
    async create (req, res) {
      try {
        res.json(await knex.insert(req.body, ['id']).into('produto'))
      } catch (e) {
        res.json({ message: `Erro ao incluir o produto. Erro: ${e.message}` })
      }
    },
    async update (req, res) {
      try {
        const { id } = req.body
        delete req.body.id
        await knex.update(req.body, ['id']).from('produto').where({ id })
        res.json({ message: 'Produto atualizado' })
      } catch (e) {
        res.json({ message: `Erro ao atualizar o produto. Erro: ${e.message}` })
      }
    },
    async remove (req, res) {
      try {
        await knex('produto')
          .del()
          .where({ id: req.params.id })
        res.json({ message: 'Produto excluido com sucesso' })
      } catch (e) {
        res.json({ message: `Erro ao excluir o produto. Erro: ${e.message}` })
      }
    }
  }
}
