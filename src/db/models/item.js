"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Item_category, {
        foreignKey: "categ_id",
      });
      Item.belongsTo(models.Item_type, {
        foreignKey: "type_id",
      });
      Item.belongsTo(models.Brand, {
        foreignKey: "brand_id",
      });
      Item.belongsTo(models.Item_model, {
        foreignKey: "model_id",
      });
      Item.belongsTo(models.Store, {
        foreignKey: "store_id",
      });
      Item.belongsToMany(models.Order, {
        through: models.Item_order,
      })
    }
  }
  Item.init(
    {
      categ_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      store_id: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 0),
      },
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "Items",
      underscored: true,
    }
  );
  return Item;
};
