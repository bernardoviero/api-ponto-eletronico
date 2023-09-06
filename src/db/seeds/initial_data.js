const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const hashedPassword = await bcrypt.hash('password123', 10);
  await knex('users').del()
  await knex('users').insert([
    { id: 1, name: 'Pessoa 1', email: "email@teste.com", cpf: "00000000001", password: hashedPassword, dateBirth: "1999-01-01", dateAlteration: "1999-03-03", active: 1 },
    { id: 2, name: 'Pessoa 2', email: "email2@teste.com", cpf: "00000000002", password: hashedPassword, dateBirth: "1999-01-02", dateAlteration: "2000-03-03", active: 1 },
    { id: 3, name: 'Pessoa 3', email: "email3@teste.com", cpf: "00000000003", password: hashedPassword, dateBirth: "1999-01-03", dateAlteration: "2001-03-03", active: 1 },
    { id: 4, name: 'Pessoa 4', email: "email4@teste.com", cpf: "00000000004", password: hashedPassword, dateBirth: "1999-01-04", dateAlteration: "2002-03-03", active: 1 },
    { id: 5, name: 'Pessoa 5', email: "email5@teste.com", cpf: "00000000005", password: hashedPassword, dateBirth: "1999-01-05", dateAlteration: "2003-03-03", active: 1 },
  ]);
};
