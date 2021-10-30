const { Model,DataTypes } = require("sequelize");
const { float } = require("webidl-conversions");
const sequelize = require("../config/connection");


class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    text_content:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {
        type : DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'post',
            key: 'id'
        }
    },

},{
    sequelize,
    underscored: true,
    modelName: 'comment',
    freezeTableName: true
}



)

module.exports = Comment;