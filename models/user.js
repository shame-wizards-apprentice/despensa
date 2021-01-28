// Creates our Users table with id and name
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        allowNull: false
    });

    // Each user has many locations, which are deleted if their user is deleted
    User.associate = (models) => {
        User.hasMany(models.Location, {
            onDelete: "cascade"
        });
    };

    return User;
}