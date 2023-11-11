/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('transaction', (table) => {
    table.increments('id').primary();
    table.integer('count').notNullable();
    table.float('discount').notNullable();
    table.integer('item_id').unsigned();
    table.timestamps(true, true);

    table.foreign('item_id').references('id').inTable('item').onUpdate('cascade').onDelete('cascade');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transaction');
};
