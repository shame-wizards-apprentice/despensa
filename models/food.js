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
        use_by_date: {
            type: DataTypes.DATE_FORMAT,
            allowNull: false
        }

    });

    // Each food belongs to a location and cannot be created without a location due to the foreign key constraint
    // [SK] added the foreignKey name to label the column in the Foods table
    Food.associate = (models) => {
        Food.belongsTo(models.Location, {
            onDelete: "cascade",
            foreignKey: {

            		name: 'location_id',
                allowNull: false
            } 
        });
    };

    return Food;
}