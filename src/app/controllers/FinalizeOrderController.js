import * as Yup from 'yup';
import Order from '../models/Order';
import File from '../models/File';


class FinalizeOrderController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(req.params.id);

    if (order === null) {
      return res.status(400).json({ error: 'Order does not exists.' });
    }


    const { signature_id } = req.body;

    const CheckIsSignature = await File.findOne({ where: { id: signature_id } });

    if (!CheckIsSignature) {
      return res.status(401).json({ error: 'Signature does not exist' });
    }

    order.end_date = new Date();
    order.signature_id = signature_id;

    await order.save();

    return res.json(order);
  }
}


export default new FinalizeOrderController();
