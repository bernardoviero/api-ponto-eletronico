const knex = require('knex');
const knexConfig = require('../../knexfile.js');

const db = knex(knexConfig.development);

const findAll = async () => {
    try {
        const users = await db.select().from('users');
        return users;
    } catch (error) {
        throw error;
    }
};

const findByEmail = async (email) => {
    try {
        const user = await db.select().from('users').where('email', email).first();
        return user;
    } catch (error) {
        throw error;
    }
};

const createUser = async (newUser) => {
    try {
        const { email, nome, senha } = newUser;
        const dataAtual = new Date();
        const [insertedId] = await db('users').insert({
            email,
            nome,
            senha,
            ativo: 1,
            dt_alteracao: dataAtual,
        });
        return { id: insertedId, ...newUser };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findAll,
    findByEmail,
    createUser,
};