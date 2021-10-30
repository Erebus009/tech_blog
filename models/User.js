const { Model, DataTypes } = require("sequelize/types");
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')

// User SQL columns defined
User.init({

    
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey:true
    

    },
    username :{
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }

    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [5]
        }

    },
    hooks: {
        // Before create of new user it waits until bcrypt has encrypted  user password from original input.
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        // This is for when the password for a user gets changed. 
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);



module.exports = User;



 









module.exports = User 
    
