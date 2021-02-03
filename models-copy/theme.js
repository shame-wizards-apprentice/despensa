// Creates our Themes table with id, icon class, images URL, and advice
module.exports = (sequelize, DataTypes) => {
    const Theme = sequelize.define("Theme", {
        iconClass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    // Each theme belongs to a user and is deleted if the user is deleted. It cannot be created without a user due to the foreign key constraint.
    Theme.associate = (models) => {
        Theme.hasMany(models.User);
    };

    return Theme;
}