/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('order_item', (table) => {
    table.increments('id').primary();
    table.integer('count').notNullable();
    table.integer('order_id').unsigned();
    table.integer('item_id').unsigned();
    table.timestamps(true, true);

    table.foreign('order_id').references('id').inTable('order').onUpdate('cascade').onDelete('cascade');
    table.foreign('item_id').references('id').inTable('item').onUpdate('cascade').onDelete('cascade');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('order_item');
};
