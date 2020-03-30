import Sequelize, { Model } from 'sequelize';

class DeliveryProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        delivery_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

export default DeliveryProblems;
