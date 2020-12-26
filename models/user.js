'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Blog, {
        as: 'blogs',
        foreignKey: 'user_id', //fk's table blogs
        sourceKey: 'id' //pk user table
      });
      
    }
  };
  User.init({
    name: DataTypes.STRING(200),
    email: {
      type :DataTypes.STRING(100),
      unique: true,
      allowNull : false
    },
    password: DataTypes.STRING(100),
    create_dt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};