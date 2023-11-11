/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('item', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('count').notNullable().defaultTo(0);
    table.integer('min_count').notNullable().defaultTo(0);
    table.float('net_price').notNullable();
    table.float('retail_price').notNullable();
    table.float('wholesale_price').notNullable();
    table.integer('provider_id').unsigned();
    table.timestamps(true, true);

    table.foreign('provider_id').references('id').inTable('provider').onDelete('cascade').onUpdate('cascade');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item');
};
