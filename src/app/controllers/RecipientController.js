import * as Yup from 'yup';
import Recipient from '../models/Recipient';
// import User from '../models/User';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });
    // só irá funcionar se colocar a verificação de validação.
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }/*
    const { email, password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    if (password && !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    */

    const {
      id, name, rua, numero, complemento, estado, cidade, cep,
    } = await Recipient.create(req.body);


    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string(),
    });

    if ((!await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }/*
    const { email, password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      return res.status(400).json({ error: 'User does not exists' });
    }
    if (password && !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    } */

    const recipient = await Recipient.findByPk(req.params.id);


    const recipientsExists = await Recipient.findByPk(req.params.id);

    if (!recipientsExists) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }

    const {
      name, rua, numero, complemento, estado, cidade, cep,
    } = await recipient.update(req.body);


    return res.json({
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }
}

export default new RecipientController();
