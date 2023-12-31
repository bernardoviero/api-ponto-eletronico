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

    const requiredParams = ['name', 'email', 'cpf', 'password', 'dateBirth'];
    const missingParams = requiredParams.filter(param => !req.body[param]);

    if (missingParams.length > 0) {
      return res.status(400).json({ error: 'Faltam parâmetros obrigatórios.' });
    }

    const dateNow = new Date();
    const dateFormat = dateNow.toISOString().split('T')[0];

    const userExists = await userModel.checkIfUserExistsByEmailOrCpf(email, cpf);

    if (userExists.emailExists) {
      throw new Error('Email já cadastrado.');
    }

    if (userExists.cpfExists) {
      throw new Error('CPF já cadastrado.');
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

    await userModel.postCreateUser(data);

    res.status(201).json({ success: 'Usuário criado com sucesso.' });
  } catch (error) {
    const errorMessage = error.message === 'Email já cadastrado.' ? 'Email já cadastrado.' :
      error.message === 'CPF já cadastrado.' ? 'CPF já cadastrado.' :
        'Erro ao criar usuário.';

    res.status(error.message === 'Email já cadastrado.' || error.message === 'CPF já cadastrado.' ? 400 : 500)
      .json({ error: errorMessage });
  }
};

const putUpdateUser = async (req, res) => {
  try {
    const { id, name, email, cpf, password, dateBirth, active } = req.body;
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
    res.status(200).json({ success: "Usuário atualizado com sucesso." });
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