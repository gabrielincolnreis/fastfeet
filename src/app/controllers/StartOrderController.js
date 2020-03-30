import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
  parseISO, isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import isWithinInterval from 'date-fns/isWithinInterval';
import Order from '../models/Order';
import Deliveryman from '../models/DeliveryMan';


class StartOrderController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(req.params.id);

    if (order === null) {
      return res.status(400).json({ error: 'Order does not exists.' });
    }

    const formatedHour = parseISO(req.body.start_date);

    if (isBefore(formatedHour, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    const year = formatedHour.getFullYear();
    const month = formatedHour.getMonth();
    const day = formatedHour.getDate();

    const checkHourInterval = isWithinInterval(formatedHour, {
      start: new Date(year, month, day, 8),
      end: new Date(year, month, day, 18),
    });

    if (!checkHourInterval) {
      return res
        .status(400)
        .json({ error: 'Date have to be within interval of 08:00 at 18:00 ' });
    }
    const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

    if (deliveryman === null) {
      return res.status(400).json({ error: 'DeliveryMan does not exists.' });
    }
    /* const { start_date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    } */

    // const formatedHour = Number(start_date);

    const orders = await Order.findAndCountAll({
      where: {
        deliveryman_id: deliveryman.id,
        start_date:
        {
          [Op.ne]: null,
          [Op.between]: [startOfDay(formatedHour), endOfDay(formatedHour)],
        },
        end_date: null,
      },
    });

    if (orders.count >= 5) {
      return res.status(400).json({ error: 'You can not make more than 5 deliveries per day' });
    }

    const { start_date } = await order.update(req.body);

    return res.json({ start_date });
  }
}

export default new StartOrderController();
