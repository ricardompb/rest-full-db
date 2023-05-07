const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (knex) => {
  return {
    async register (req, res) {
      const { nome, login, senha, email } = req.body
      try {
        const users = await knex('usuario')
          .insert({ nome, login, senha: bcryptjs.hashSync(senha, 8), email }, ['id'])
        const [user] = users
        return res.status(201).json({ "id": user.id })
      } catch (e) {
        res.status(500).json({ message: `Erro ao registrar usuário - ${ e.message }` })
      }
    },

    async login (req, res) {
      try {
        const { login, senha } = req.body
        const usuarios = await knex
          .select('*')
          .from('usuario')
          .where({ login })
        if (usuarios.length === 0) {
          return res.status(200).json({ message: 'Usuário não encontrado na base de dados...' })
        }
        const [usuario] = usuarios
        const isValid = bcryptjs.compareSync(senha, usuario.senha)
        if (!isValid) {
          return res.status(200).json({ message: 'Senha informada está incorreta.' })
        }
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        delete usuario.senha
        return res.status(200).json({
          ...usuario,
          token
        })
      } catch (e) {
        return res.status(500).json({ message: `Erro ao verificar login - ${e.message}` })
      }
    }
  }
}
