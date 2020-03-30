import { Op } from 'sequelize';
import Deliveryman from '../models/DeliveryMan';
import Order from '../models/Order';


class ScheduleDeliveryController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    const order = await Order.findAll({
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(order);
  }

  async index_2(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    const order = await Order.findAll({
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date:
        {
          [Op.ne]: null,
        },
      },
    });

    return res.json(order);
  }
}

export default new ScheduleDeliveryController();
