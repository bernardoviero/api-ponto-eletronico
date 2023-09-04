const userModel = require('../models/usersModel');

const getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário por email' });
    }
};

const postCreateUser = async (req, res) => {
    try {
        const { email, nome, senha } = req.body;
        const newUser = {
            email,
            nome,
            senha,
        };

        await userModel.postCreateUser(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

module.exports = {
    getAll,
    getUserByEmail,
    postCreateUser,
};