/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('produto', table => {
      table.increments('id')
      table.string('descricao', 255).notNullable()
      table.decimal('valor', 15,2).notNullable()
      table.string('marca', 255).notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('produto')
};
