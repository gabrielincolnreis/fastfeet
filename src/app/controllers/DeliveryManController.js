import * as Yup from 'yup';
import Deliveryman from '../models/DeliveryMan';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryManExists = await Deliveryman.findOne({ where: { email: req.body.email } });

    if (deliveryManExists) {
      return res.status(400).json({ error: 'DeliveryMan already exists' });
    }
    const {
      id, name, email, employee,
    } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      employee,
    });
  }

  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      where: {
        employee: true,
      },

    });
    return res.json(deliverymans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists.' });
      }
    }

    const { id, name, employee } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      employee,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (deliveryman === null) {
      return res.status(400).json({ error: 'DeliveryMan does not exists.' });
    }

    deliveryman.employee = false;


    await deliveryman.save();

    return res.json(deliveryman);
  }
}
export default new DeliveryManController();
