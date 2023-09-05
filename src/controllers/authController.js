const jwt = require('jsonwebtoken');
const validator = require('validator');
const userModal = require('../models/usersModel');
require('dotenv').config();

const postAuthenticateUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Senha inválida' });
    }
    const authenticatedUser = await userModal.postAuthenticateUser(email, password);

    if (!authenticatedUser) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const SECRET = process.env.SECRET;
    const token = jwt.sign({ id: authenticatedUser.id }, SECRET, { expiresIn: 300 });
    return res.json({ auth: true, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar autenticação.' });
  }
};

// usar essa função para acesso a rotas sensiveis
// const verifyJWT = (req, res, next) => {
//   const token = req.headers['x-access-token'];

//   jwt.verify(token, process.env.SECRET, (err, decoded) => {
//     if (err) return res.status(401).end();

//     req.userId = decoded.id;
//     next();
//   });
// };

module.exports = {
  postAuthenticateUser
};