/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_roles').del()
  await knex('user_roles').insert([
    {id: 1, name: 'admin'},
    {id: 2, name: 'manager'},
    {id: 3, name: 'client'}
  ]);
};
