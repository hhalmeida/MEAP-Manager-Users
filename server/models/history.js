'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  // History.associate = (models) =>{
  //   History.belongTo(models.User, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE'
  //   });
  // };

  return History;
};