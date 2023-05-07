module.exports = (knex) => {
  return {
    async get (req, res) {
      const agendas = await knex.select('*').from('agenda')
      res.json(agendas)
    },
    async getById (req, res) {
      const agendas = await knex.select('*').from('agenda').where('id', '=', req.params.id)
      const [agenda] = agendas
      if (!agenda) return res.json({ message: 'Agenda não encontrado.' })
      res.json(agenda)
    },
    async create (req, res) {
      try {
        res.json(await knex.insert(req.body, ['id']).into('agenda'))
      } catch (e) {
        res.json({ message: `Erro ao incluir o agenda. Erro: ${e.message}` })
      }
    },
    async update (req, res) {
      try {
        const { id } = req.body
        delete req.body.id
        await knex.update(req.body, ['id']).from('agenda').where({ id })
        res.json({ message: 'Agenda atualizado' })
      } catch (e) {
        res.json({ message: `Erro ao atualizar o agenda. Erro: ${e.message}` })
      }
    },
    async remove (req, res) {
      try {
        await knex('agenda')
          .del()
          .where({ id: req.params.id })
        res.json({ message: 'Agenda excluido com sucesso' })
      } catch (e) {
        res.json({ message: `Erro ao excluir o agenda. Erro: ${e.message}` })
      }
    }
  }
}
