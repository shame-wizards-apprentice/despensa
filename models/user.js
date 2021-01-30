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
    }, { underscored: true });

    // Each user has many locations, which are deleted if their user is deleted
    User.associate = (models) => {
        User.hasMany(models.Location, {
            onDelete: "cascade"
        });
        User.hasMany(models.Food, {
            onDelete: "cascade"
        });
        User.hasMany(models.Container, {
            onDelete: "cascade"
        });
        User.belongsTo(models.Theme, {
            foreignKey: {
                name: "theme_id",
                allowNull: false
            }
        });
    };
    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};