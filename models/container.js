// Creates our Containers table with id and type
module.exports = (sequelize, DataTypes) => {
    const Container = sequelize.define("Container", {
        type: { 
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    // Each container belongs to a location and cannot be created without a location due to the foreign key constraint
    Container.associate = (models) => {
        Container.belongsTo(models.Location, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            } 
        });
    };

    return Container;
}