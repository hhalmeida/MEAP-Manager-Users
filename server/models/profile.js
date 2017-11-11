'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  // Profile.associate = (models) =>{
  //   Profile.belongTo(models.User, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE'
  //   });
  // };
  return Profile;
};