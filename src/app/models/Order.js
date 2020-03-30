import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
  }
}

export default Order;
