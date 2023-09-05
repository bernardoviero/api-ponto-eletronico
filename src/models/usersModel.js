const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const bcrypt = require('bcrypt');

const db = knex(knexConfig.development);

const getAllUsers = async () => {
    try {
        const users = await db.select().from('users');
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
            date_birth: dateBirth,
            cpf,
            active: 1,
            date_alteration: dateAlteration,
        });

        if (!insertedId) {
            throw new Error('Erro ao criar usuário no banco de dados.');
        }

        return { id: insertedId, ...data };
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
            date_birth: data.dateBirth,
            active: data.active,
            date_alteration: data.dateAlteration
        });

        if (updatedRows === 0) {
            throw new Error('Usuário não encontrado para atualização.');
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

        return user;
    } catch (error) {
        throw new Error('Erro ao verificar autenticação: ' + error.message);
    }
};

module.exports = {
    getAllUsers,
    postCreateUser,
    putUpdateUser,
    postAuthenticateUser,
};