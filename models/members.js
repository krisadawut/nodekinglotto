'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Members.init({
    mpid: DataTypes.STRING,
    mfname: DataTypes.STRING,
    mlname: DataTypes.STRING,
    musername: DataTypes.STRING,
    mpsswd: DataTypes.STRING,
    mstatus: DataTypes.STRING,
    mtid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Members',
    tableName: 'm_member',
    timestamps: false
  });
  return Members;
};