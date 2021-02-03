// Creates our Locations table with id, name, and type
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("Location", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },


    });

    // Each location has many foods and containers, both of which are deleted if the location is deleted. 
    // Each location belongs to a user, and cannot be created without a user due to the foreign key constraint.

    // [SK] added foreignKey name to label column in Locations table
    Location.associate = (models) => {
        Location.hasMany(models.Food, {
            // TODO: Figure out what happens to food if not deleted when location is deleted
        });
        // Location.hasMany(models.Container, {
        //     onDelete: "cascade"
        // });
        Location.belongsTo(models.User, {
            foreignKey: {
                name: "UserId",
                allowNull: false
            }
        });
    };

    return Location;
};