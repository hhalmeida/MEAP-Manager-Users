module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwd: DataTypes.STRING
  });

  User.associate = (models) => {
    User.hasMany(models.History, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Profile, {
      foreignKey : 'userId'
    })
  };
  return User;
};