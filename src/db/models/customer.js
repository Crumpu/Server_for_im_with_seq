'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, {
        foreignKey: 'customer_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 8));
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      underscored: true,
    }
  );
  return Customer;
};