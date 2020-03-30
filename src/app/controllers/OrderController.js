import * as Yup from 'yup';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/DeliveryMan';

import OrderMail from '../jobs/OrderMail';
import Queue from '../../lib/Queue';


class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // DeliveryMan

    const { deliveryman_id } = req.body;

    const deliveryman = await Deliveryman.findOne({
      where: {
        id: deliveryman_id,
        employee: true,
      },
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'DeliveryMan does not exist or is employed' });
    }

    // Recipients

    const { recipient_id } = req.body;

    const recipient = await Recipient.findOne({ where: { id: recipient_id } });

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    const order = await Order.create(req.body);


    await Queue.add(OrderMail.key, {
      order,
      deliveryman,
      recipient,
    });


    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(req.params.id);

    if (order === null) {
      return res.status(400).json({ error: 'Order does not exists.' });
    }

    const {
      recipient_id,
      deliveryman_id,
      product,
    } = await order.update(req.body);

    return res.json({
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      where: { canceled_at: null },
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(orders);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (order === null) {
      return res.status(400).json({ error: 'Order does not exists.' });
    }
    order.canceled_at = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new OrderController();
