import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    const { order, deliveryman, recipient } = data;


    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'Order',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product: order.product,
      },
    });
  }
}

export default new OrderMail();
