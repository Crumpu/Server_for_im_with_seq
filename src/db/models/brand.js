"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Item, {
        foreignKey: "brand_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Brand.hasMany(models.Item_model, {
        foreignKey: "brand_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Brand.init(
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: "Brand",
      tableName: "brands",
      underscored: true,
    }
  );
  return Brand;
};
