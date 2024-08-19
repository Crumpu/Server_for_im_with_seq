"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item_order.belongsTo(models.Item, {
    
      });

      Item_order.belongsTo(models.Order, {
      
      });
    }
  }
  Item_order.init(
    {
      item_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item_order",
      tableName: "item_orders",
      timestamps: false,
      underscored: true,
    }
  );
  return Item_order;
};
