const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (knex) => {
  return {
    async register (req, res) {
      const { nome, login, senha, email } = req.body
      try {
        const users = await knex('usuario')
          .insert({ nome, login, senha: bcryptjs.hashSync(senha, 8), email }, ['id'])
        const [usuario] = users
        return res.status(201).json({ "id": usuario.id })
      } catch (e) {
        res.status(500).json({ message: `Erro ao registrar usuário - ${ e.message }` })
      }
    },
    async login (req, res) {
      try {
        const { login, senha } = req.body
        const usuarios = await knex.select('*').from('usuario').where({ login })
        const [usuario] = usuarios
        if (!usuario) {
          return res.status(200).json({ message: 'Usuário não encontrado na base de dados...' })
        }
        const isValid = bcryptjs.compareSync(senha, usuario.senha)
        if (!isValid) {
          return res.status(200).json({ message: 'Senha informada está incorreta.' })
        }
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        delete usuario.senha
        return res.status(200).json({ ...usuario, token })
      } catch (e) {
        return res.status(500).json({ message: `Erro ao verificar login - ${ e.message }` })
      }
    },
    async authorization (req, res, next) {
      const { authorization } = req.headers
      if (!authorization) {
        return res.status(401).json({ message: 'Token de acesso requerido' })
      }
      const [bearer, token] = authorization.split(' ')
      if (!/Bearer/.test(bearer)) {
        return res.status(401).json({ message: 'Tipo de autenticação deve ser bearer' })
      }
      jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
          return res.status(401).json({ message: 'Acesso negado' })
        }
        req.usuarioId = decode.id
        return next()
      })
    },
    async isAdmin (req, res, next) {
      try {
        const usuarios = await knex.select('*').from('usuario').where({ id: req.usuarioId })
        const [usuario] = usuarios
        if (!usuario) {
          return res.status(403).json({ message: 'Usuário não encontrado...' })
        }
        const roles = usuario.roles.split(';')
        if (roles.includes('ADMIN')) {
          return next()
        }
        return res.status(403).json({ message: 'Role de ADMIN requerida' })
      } catch (e) {
        return res.status(500).json({ message: `Erro ao verificar roles do usuário - ${ e.message }` })
      }
    }
  }
}
