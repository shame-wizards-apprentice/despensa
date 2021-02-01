// Creates our Foods table with id, name, brand, and use-by date
// TODO: What format makes sense for the icon?
module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define("Food", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        daysToUse: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isCheese: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    },);

    // Each food belongs to a location and cannot be created without a location due to the foreign key constraint
    // [SK] added the foreignKey name to label the column in the Foods table
    Food.associate = (models) => {
        Food.belongsTo(models.Container, {
            // TODO: figure out what happens when deleted
            foreignKey: {
                name: "containerId",
                allowNull: false
            }
        });
        Food.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: {
                name: "userId",
                allowNull: false
            }
        })
    };

    return Food;
}