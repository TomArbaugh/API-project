'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Membership.belongsTo(models.Group, {
      //   foreignKey: 'groupId'
      // })
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM({
        values: ['host','co-host', 'member', 'pending']
      })
    
  }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};