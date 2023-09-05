const knex = require('knex');
const knexConfig = require('../../knexfile.js');

const db = knex(knexConfig.development);

const getAllUsers = async () => {
    try {
        const users = await db.select().from('users');
        return users;
    } catch (error) {
        throw error;
    }
};

const postCreateUser = async (data) => {
    try {
        const { email, name, password, date_birth, cpf, date } = data;

        const [insertedId] = await db('users').insert({
            email,
            name,
            password,
            date_birth,
            cpf,
            active: 1,
            date_alteration: date,
        });
        return { id: insertedId, ...data };
    } catch (error) {
        throw error;
    }
};

const putEmail = async (data) => {
    try {
        await db('users').where('id', data.id).update({ email: data.email, date_alteration: data.date_alteration });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    postCreateUser,
    putEmail
};