"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Item,  {
        as: "items",
        through: models.Item_order,
        foreignKey: "order_id",
      });
      Order.belongsTo(models.Customer, {
        foreignKey: "customer",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Order.init(
    {
      code: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      underscored: true,
    }
  );
  return Order;
};
