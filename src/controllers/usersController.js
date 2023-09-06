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
            return res.status(400).send('Faltam parâmetros obrigatórios.');
        }

        const dateNow = new Date();
        const dateFormat = dateNow.toISOString().split('T')[0];

        const userExists = await userModel.checkIfUserExistsByEmailOrCpf(email, cpf);

        if (userExists.emailExists) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        if (userExists.cpfExists) {
            return res.status(400).json({ error: 'CPF já cadastrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            name,
            email,
            cpf,
            password: hashedPassword,
            dateBirth,
            dateAlteration: dateFormat
        };
        const newUser = await userModel.postCreateUser(data);
        res.status(201).json(newUser.id);
    } catch (error) {
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
        res.status(200).json(data.id);
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