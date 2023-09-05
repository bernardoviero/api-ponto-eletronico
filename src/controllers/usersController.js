const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'fetching users' });
    }
};

const postCreateUser = async (req, res) => {
    try {
        const { email, name, password, date_birth, cpf } = req.body;
        const date = new Date();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = {
            email,
            name,
            hashedPassword,
            date_birth,
            cpf,
            date
        };

        await userModel.postCreateUser(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'creating users' });
    }
};

const putEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const dateNow = new Date();
        const dateFormat = dateNow.toISOString().split('T')[0];

        const data = {
            id,
            email,
            date_alteration: dateFormat
        };
        await userModel.putEmail(data);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'altering users' });
    }
};

module.exports = {
    getAllUsers,
    postCreateUser,
    putEmail,
};