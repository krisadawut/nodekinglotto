'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mltplay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mltplay.init({
    ltid: {
      type: DataTypes.STRING,
      primaryKey : true
    },
    lpmin: DataTypes.STRING,
    lpmax: DataTypes.STRING,
    lpmaxpn: DataTypes.STRING,
    lpst: DataTypes.STRING,
    mpid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Mltplay',
    tableName : 'm_lotto_play',
    timestamps : false
  });
  return Mltplay;
};