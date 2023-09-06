const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const bcrypt = require('bcrypt');

const db = knex(knexConfig.development);

const getAllUsers = async () => {
  try {
    const users = await db.select('name', 'email', 'cpf', 'dateBirth', 'active').from('users');
    return users;
  } catch (error) {
    throw new Error('Erro ao buscar usuários no banco de dados: ' + error.message);
  }
};

const postCreateUser = async (data) => {
  try {
    const { email, name, password, dateBirth, cpf, dateAlteration } = data;
    const [insertedId] = await db('users').insert({
      email,
      name,
      password,
      dateBirth: new Date(dateBirth),
      cpf,
      active: 1,
      dateAlteration: new Date(dateAlteration),
    });

    if (!insertedId) {
      throw new Error('Erro ao criar usuário no banco de dados.');
    }
    return { id: insertedId };
  } catch (error) {
    throw new Error('Erro ao criar usuário no banco de dados: ' + error.message);
  }
};

const putUpdateUser = async (data) => {
  try {
    const updatedRows = await db('users').where('id', data.id).update({
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      password: data.password,
      dateBirth: new Date(data.dateBirth),
      active: data.active,
      dateAlteration: new Date(data.dateAlteration)
    });

    if (updatedRows === 0) {
      throw new Error('Usuário não encontrado para atualização.');
    } else {
      return { id: data.id };
    }
  } catch (error) {
    throw new Error('Erro ao atualizar usuário no banco de dados: ' + error.message);
  }
};

const postAuthenticateUser = async (email, password) => {
  try {
    const user = await db('users').where('email', email).first();

    if (!user) {
      return null;
    }

    const hashedPasswordFromDB = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!passwordMatch) {
      return null;
    }

    return user.id;
  } catch (error) {
    throw new Error('Erro ao verificar autenticação: ' + error.message);
  }
};

const checkIfUserExistsByEmailOrCpf = async (email, cpf) => {
  const userWithEmail = await db('users').where({ email }).first();
  const userWithCpf = await db('users').where({ cpf }).first();

  return {
    emailExists: !!userWithEmail,
    cpfExists: !!userWithCpf,
  };
};

module.exports = {
  getAllUsers,
  postCreateUser,
  putUpdateUser,
  postAuthenticateUser,
  checkIfUserExistsByEmailOrCpf,
};