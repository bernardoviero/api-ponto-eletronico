const emailModel = require('../models/emailModel');

const postSendVerificationEmail = async (req, rep) => {
  const { id, email, name } = req.body;

  let code = '';
  const characters = '0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    code += characters.charAt(randomIndex);
  }

  try {
    //enviar esse code para a model do email que estará vinculada ao email do usuario/id
    const data = { id, email, dateAlteration: new Date(), code }
    const dbCode = await emailModel.postCreateCode(data);

    const template = `Olá ${name}, seja bem vindo ao Ponto Eletrônico! O código para a verificação do seu email é \n: ${code}`;

    MailQueue.add({
      to: email,
      from: 'ponto-eletronico@gmail.com',
      subject: 'Confirmação de Email',
      text: template,
    });
    return rep.status(200).send();
  } catch (error) {
    return rep.status(500).send();
  }
}


const getVerifyCode = async (req, rep) => {
  try {
    const data = { id, email, code } = req.body;
    const codeCorrect = await emailModel.getVerifyCode(data);
    if (code === codeCorrect) {
      return rep.status(200).send("Email verificado com sucesso!");
    }
  } catch (error) {
    return rep.status(500).send("Erro ao verificar email.");
  }

}

module.exports = {
  postSendVerificationEmail,
  getVerifyCode
};