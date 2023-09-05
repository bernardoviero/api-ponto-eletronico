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
        return { id: insertedId, ...data };
    } catch (error) {
        throw error;
    }
};

const putUpdateUser = async (data) => {
    try {
        await db('users').where('id', data.id).update({
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            password: data.password,
            date_birth: data.dateBirth,
            active: data.active,
            date_alteration: data.dateAlteration
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    postCreateUser,
    putUpdateUser
};