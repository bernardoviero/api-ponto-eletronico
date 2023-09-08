/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('emailCode', function (table) {
    table.increments('id').primary();
    table.integer('id_user').notNullable().references('id').inTable('users');
    table.string('email').unique().notNullable();
    table.string('code').unique().notNullable();
    table.date('dateAlteration').notNullable();
    table.integer('active').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('emailCode');
};
