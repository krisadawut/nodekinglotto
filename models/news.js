'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  News.init({
    nid: {
      type: DataTypes.STRING,
      primaryKey: true
    }
      ,
    ntitle: DataTypes.STRING,
    ndesc: DataTypes.TEXT,
    nstatus: DataTypes.STRING,
    create_dt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'News',
    tableName: 'l_news',
    timestamps: false
  });
  return News;
};