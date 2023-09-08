const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const bcrypt = require('bcrypt');

const db = knex(knexConfig.development);

const postCreateCode = async (data) => {
  try {
    const { id, email, dateAlteration, code } = data;
    const hashEmail = await bcrypt.hash(email, 10);
    const [insertedId] = await db('emailcode').insert({
      id_user: id,
      email: hashEmail,
      code,
      active: 1,
      dateAlteration: new Date(dateAlteration),
    });
    return insertedId;
  } catch (error) {
    throw new Error('Erro ao criar código no banco de dados: ' + error.message);
  }
}

const getVerifyCode = async (data) => {
  try {
    const { id, email } = data;
    const user = await db('users').where('email', email).first();
    const emailMatch = await bcrypt.compare(email, user.email);
    if (emailMatch) {
      const code = await db('emailCode').select('code').where('id_user', id).first();
      return code;
    }
  } catch (error) {
    throw new Error('Erro ao criar código no banco de dados: ' + error.message);
  }
}

module.exports = {
  postCreateCode,
  getVerifyCode
};