'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lottopld extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lottopld.init({
    ltid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    lpdmin: DataTypes.STRING,
    lpdmax: DataTypes.STRING,
    lpdmaxpn: DataTypes.STRING,
    lpdst: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Lottopld',
    tableName: 'lotto_play_detail',
    timestamps:false
  });
  return Lottopld;
};