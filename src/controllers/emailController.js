const emailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const generateVerificationCode = () => {
  let code = '';
  const characters = '0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    code += characters.charAt(randomIndex);
  }

  return code;
};

const postSendVerificationEmail = async (req, res) => {
  const { id, email, name } = req.body;

  try {
    const code = generateVerificationCode();
    const data = { id, email, dateAlteration: new Date(), code };
    const dbCode = await emailModel.postCreateCode(data);

    if (dbCode) {
      const template = `Olá ${name}, seja bem-vindo ao Ponto Eletrônico! O código para a verificação do seu email é: ${code}`;
      const mailOptions = {
        to: email,
        from: EMAIL_USER,
        subject: 'Confirmação de Email',
        text: template,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Erro ao enviar email.");
        } else {
          console.log('E-mail enviado:', info.response);
          return res.status(200).send("Email enviado com sucesso!");
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao enviar email.");
  }
};

const getVerifyCode = async (req, res) => {
  const { id, email, code } = req.body;

  try {
    const codeCorrect = await emailModel.getVerifyCode({ id, email });
    if (code === codeCorrect) {
      return res.status(200).send("Email verificado com sucesso!");
    } else {
      return res.status(400).send("Código de verificação incorreto.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao verificar email.");
  }
};

module.exports = {
  postSendVerificationEmail,
  getVerifyCode
};