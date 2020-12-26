'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payrate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Payrate.init({
    ltid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    prtid: DataTypes.STRING,
    rptop3: DataTypes.STRING,
    rpbot3: DataTypes.STRING,
    rptod3: DataTypes.STRING,
    rptop2: DataTypes.STRING,
    rpbot2: DataTypes.STRING,
    rptod2: DataTypes.STRING,
    rprtop: DataTypes.STRING,
    rprbot: DataTypes.STRING,
    rpstatus: DataTypes.STRING,
    mpid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payrate',
    tableName: 'm_pay_rate',
    timestamps: false
  });
  return Payrate;
};