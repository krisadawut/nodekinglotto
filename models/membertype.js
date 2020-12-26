'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MemberType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MemberType.init({
    mtid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    mtname: DataTypes.STRING,
    mtstatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MemberType',
    tableName: 'l_member_type',
    timestamps: false
  });
  return MemberType;
};