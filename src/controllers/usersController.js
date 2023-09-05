const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

const postCreateUser = async (req, res) => {
    try {
        const { name, email, cpf, password, dateBirth } = req.body;
        if (!name || !email || !cpf || !password || !dateBirth) {
            return res.status(400).json({ error: 'Faltam parâmetros obrigatórios.' });
        }

        const dateNow = new Date();
        const dateFormat = dateNow.toISOString().split('T')[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            name,
            email,
            cpf,
            password: hashedPassword,
            dateBirth,
            dateAlteration: dateFormat
        };
        await userModel.postCreateUser(data);
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

const putUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, cpf, password, dateBirth, active } = req.body;
        if (!id || !name || !email || !cpf || !password || !dateBirth || active === undefined) {
            return res.status(400).json({ error: 'Faltam parâmetros obrigatórios.' });
        }

        const dateNow = new Date();
        const dateFormat = dateNow.toISOString().split('T')[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            id,
            name,
            cpf,
            password: hashedPassword,
            dateBirth,
            active,
            email,
            dateAlteration: dateFormat
        };
        await userModel.putUpdateUser(data);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
};

module.exports = {
    getAllUsers,
    postCreateUser,
    putUpdateUser,
};