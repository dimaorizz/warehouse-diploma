/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('role_id').notNullable().unsigned();

    table.foreign('role_id').references('id').inTable('user_roles').onUpdate('cascade').onDelete('cascade');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};