// Creates our Advice table with id and content
module.exports = (sequelize, DataTypes) => {
    const Advice = sequelize.define("Advice", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    });

    return Advice;
}