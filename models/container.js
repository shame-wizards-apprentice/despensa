// Creates our Containers table with id and type
module.exports = (sequelize, DataTypes) => {
    const Container = sequelize.define("Container", {
        // TODO: Do we want to have a name option for shelves?
        type: {
            type: DataTypes.STRING,
            allowNull: false

        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    // Each container belongs to a location and cannot be created without a location due to the foreign key constraint


    // [SK] added foreignKey name to label column in containers table

    Container.associate = (models) => {
        Container.belongsTo(models.Location, {
            onDelete: "cascade",
            foreignKey: {
                name: 'location_id',
                allowNull: false
            }
        });
        Container.belongsTo(models.User, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        });
    };

    return Container;
};