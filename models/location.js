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
    Location.associate = (models) => {
        Location.hasMany(models.Food, {
            onDelete: "cascade"
        });
        Location.hasMany(models.Container, {
            onDelete: "cascade"
        });
        Location.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }    
        });   
    };

    return Location;
};