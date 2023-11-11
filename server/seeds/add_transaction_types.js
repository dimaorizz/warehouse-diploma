/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transaction_types').del()
  await knex('transaction_types').insert([
    {id: 1, name: 'supply'},
    {id: 2, name: 'write_off'},
    {id: 3, name: 'order'},
    {id: 4, name: 'order_return'},
    {id: 5, name: 'order_defect'},
  ]);
};
