'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LotteryType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.LotteryType.belongsTo(models.LottoStat, 
      //   {
      //     as: 'l_lottery_stat',
      //     foreignKey: 'ltid', //fk's table
      //     sourceKey: 'ltid' //pk stat table
      //   }

      // );
    }
  };
  LotteryType.init({
    ltid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    ltids: DataTypes.STRING,
    ltdesc: DataTypes.STRING,
    ltstatus: DataTypes.STRING,
    maindesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LotteryType',
    tableName: 'l_lottery_type',
    timestamps: false
  });
  return LotteryType;
};