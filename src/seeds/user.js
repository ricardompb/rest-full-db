/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcryptjs = require('bcryptjs')

exports.seed = async function(knex) {
  const senha = bcryptjs.hashSync('1234', 8)
  await knex('usuario').insert({ nome: 'user', login: 'user', senha, email: 'user@abc.com.br' }, ['id'])
};
