module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    recipient_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    deliveryman_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    product: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    canceled_at: {
      type: Sequelize.DATE,
    },
    start_date: {
      type: Sequelize.DATE,
    },
    end_date: {
      type: Sequelize.DATE,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('orders'),
};
