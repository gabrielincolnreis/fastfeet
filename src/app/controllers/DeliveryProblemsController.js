import * as Yup from 'yup';
import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';


class DeliveryProblemsController {
  // List all deliveries
  async index(req, res) {
    const deliveryProblems = await DeliveryProblems.findAll();

    return res.json(deliveryProblems);
  }

  async index_2(req, res) {
    const order = await Order.findByPk(req.params.id);

    const deliveryProblems = await DeliveryProblems.findOne({ where: { delivery_id: order.id } });
    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // DeliveryMan

    const { deliveryman_id } = req.body;

    const deliveryman = await DeliveryMan.findOne({
      where: {
        id: deliveryman_id,
        employee: true,
      },
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'DeliveryMan does not exist or is employed' });
    }

    const delivery = await Order.findByPk(req.params.deliverId);

    if (delivery === null) {
      return res.status(400).json('Delivery Does not exist');
    }
    const delivery_id = req.params.deliverId;
    const { description } = req.body;
    const problem = await DeliveryProblems.create({
      deliveryman_id,
      description,
      delivery_id,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const problem = await DeliveryProblems.findByPk(req.params.problemId);

    if (problem === null) {
      return res.status(400).json({ error: 'Problem does not exists.' });
    }
    const order = await Order.findOne({ where: { id: problem.delivery_id } });

    order.canceled_at = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new DeliveryProblemsController();
