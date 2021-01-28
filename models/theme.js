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
        // This data type is an array of strings, so we can store all the advice that corresponds with each theme in one place
        advice: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }

    });

    // Each theme belongs to a user and is deleted if the user is deleted. It cannot be created without a user due to the foreign key constraint.
    Theme.associate = (models) => {
        Theme.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            } 
        });
    };

    return Theme;
}