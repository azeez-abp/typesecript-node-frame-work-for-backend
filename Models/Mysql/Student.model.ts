
import { Sequelize, Model, DataTypes,ModelAttributes,InitOptions,Deferrable } from 'sequelize';
import ModelTemplate from '../Model';

export const UserDB = (MysqlBDConnection:Sequelize):any=>{

class User extends Model {}

const userTable: ModelAttributes  =  {
  id: {
    type: DataTypes.BIGINT ,
    autoIncrement: true,
    primaryKey: true,
    
    // validate: {
    //   max: 9223372036854775807
    // },
    references: {
      // This is a reference to another model
      model: 'Admin',
      // This is the column name of the referenced model
      key: 'userId',

    }
   
  },
  name: {
    type: DataTypes.STRING(80),
    allowNull: false,
    
  },
  userId: {
    type: DataTypes.STRING(80),
    allowNull: false,
    
  },
  email: {
    type: DataTypes.STRING(220),
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING(132),
    allowNull: false
  },
  hash: {
    type: DataTypes.STRING(132),
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING(132),
    allowNull: false
  },
  sessionToken: {
    type: DataTypes.STRING(132),
    allowNull: false
  },
 
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
    
  },

}

const userTableConnector : InitOptions ={
  sequelize: MysqlBDConnection,
  modelName: 'users',
   // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
  indexes: [
    {
      fields: ['email', 'id','userId']
    }
  ]
  
}
///MysqlBDConnection.getQueryInterface().createTable("user",userTable)//create the table


User.init(userTable, userTableConnector) ;
User.sync({ alter: true })///
return User
}