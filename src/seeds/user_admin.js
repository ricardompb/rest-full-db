/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcryptjs = require('bcryptjs')

exports.seed = async function(knex) {
  const senha = bcryptjs.hashSync('admin', 8)
  await knex('usuario').insert({ nome: 'Administrador', login: 'admin', senha, email: 'admin@admin.com.br', roles: 'ADMIN;USER' }, ['id'])
};
