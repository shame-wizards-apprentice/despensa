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
        expirationDate: {
            type: DataTypes.DATEONLY,
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

    });

    // Each food belongs to a user and cannot be created without a location due to the foreign key constraint
    Food.associate = (models) => {
    	Food.belongsTo(models.Location, {
          onDelete: "cascade",
          foreignKey: {
              name: "LocationId",
              allowNull: false
          }
      });
      Food.belongsTo(models.User, {
          onDelete: "cascade",
          foreignKey: {
              name: "UserId",
              allowNull: false
          }
      });
    };

    return Food;
}