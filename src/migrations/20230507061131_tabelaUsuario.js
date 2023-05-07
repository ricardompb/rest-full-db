/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('usuario', table => {
      table.increments('id')
      table.string('nome', 200).notNullable()
      table.string('email', 100).notNullable()
      table.string('login', 100).notNullable()
      table.string('senha', 100).notNullable()
      table.string('roles', 200).defaultTo('USER').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usuario')
};
