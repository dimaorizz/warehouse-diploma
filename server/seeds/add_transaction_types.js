const bcrypt = require("bcryptjs");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('user').del()
  await knex('user').insert([
    {id: 1, username: 'admin', password: await bcrypt.hash("admin", 10), role: 0},
  ]);
};
