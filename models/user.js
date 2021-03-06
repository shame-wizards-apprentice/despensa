const bcrypt = require('bcrypt');

// Creates our Users table with id and name
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    });

    // Each user has many locations, which are deleted if their user is deleted
    User.associate = (models) => {
        User.hasMany(models.Location, {
            onDelete: "cascade"
        });
        User.hasMany(models.Food, {
            onDelete: "cascade"
        });
        User.belongsTo(models.Theme, {
            foreignKey: {
                allowNull: false,
                defaultValue: 1
            }
        });
    };
    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};