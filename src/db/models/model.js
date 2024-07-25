"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item_model.hasMany(models.Item, {
        foreignKey: "model_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Item_model.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      brand_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Item_model",
      tableName: "Models",
      underscored: true,
    }
  );
  return Item_model;
};
