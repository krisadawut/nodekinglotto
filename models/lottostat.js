'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LottoStat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.LottoStat.hasMany(models.LotteryType, {
      //   as: 'l_lottery_type',
      //   foreignKey: 'ltid', //fk's table blogs
      //   sourceKey: 'ltid' //pk user table
      // });
      // define association here
    }
  };

  LottoStat.init({
    lsid: {
      type: DataTypes.STRING,
      primaryKey: true
    } ,
    lsdesc: DataTypes.STRING,
    ltid: DataTypes.STRING,
    prid: DataTypes.STRING,
    lsstatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LottoStat',
    tableName: 'l_lottery_stat',
    timestamps: false
  });
  return LottoStat;
};