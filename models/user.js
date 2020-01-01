module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        }
    }, {
        timestamps: true, //createdAt, updatedAt, deletedAt.
        paranoid: true, //soft delete, 삭제를 강제로 지우지 않고, soft delete실행.
        underscored: true, //스네이크 케이스
        freezeTableName: true,
        tableName: "user",
    })
);