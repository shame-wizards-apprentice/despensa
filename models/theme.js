// Creates our Themes table with id, icon class, images URL, and advice
module.exports = (sequelize, DataTypes) => {
    const Theme = sequelize.define("Theme", {
        icon_class: {
            type: DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: DataTypes.STRING,
            allowNull: false
        },
        advice: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    // Each theme belongs to a user and is deleted if the user is deleted. It cannot be created without a user due to the foreign key constraint.

    // [SK] added foreignKey name to label column in Themes table
    // **NOTE** I think we may want to add a theme_id column (not as a foreign key restraint) to the Users table -- we don't want to repeat a theme just to associate it with a user; this field would be good for custom themes, though
    Theme.associate = (models) => {
        Theme.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: {
            		name: 'user_id',
                allowNull: false
            } 
        });
    };

    return Theme;
}