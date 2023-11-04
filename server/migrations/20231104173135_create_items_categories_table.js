/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items_categories_relation', function (table) {
    table.integer('category_id').unsigned().primary();
    table.integer('item_id').unsigned().primary();

    table.foreign('category_id').references('id').inTable('item_categories').onUpdate('cascade').onDelete('cascade');
    table.foreign('item_id').references('id').inTable('items').onUpdate('cascade').onDelete('cascade');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('items_categories_relation');
};
