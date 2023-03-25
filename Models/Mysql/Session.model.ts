
import { Sequelize, Model, DataTypes,ModelAttributes,InitOptions,Deferrable } from 'sequelize';


export const SessionDB = (MysqlBDConnection:Sequelize):any=>{

class Session extends Model {}

const SessionSchma:ModelAttributes  =  {
  lastModified:{type:DataTypes.INTEGER,allowNull:true},
  expires :{type:DataTypes.DATE},
  rememeber:{type:DataTypes.BOOLEAN,defaultValue:false}, 
  user_id:{type:DataTypes.STRING(120),unique:true},
  session_id:{type:DataTypes.STRING(120),unique:true,primaryKey: true },
  cookie_id:{type:DataTypes.STRING(120),unique:true},
  cookie:{type:DataTypes.TEXT},
  table:{type:DataTypes.STRING(120)}
}

const userTableConnector : InitOptions ={
  sequelize: MysqlBDConnection,
  modelName: 'session',
   // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
  indexes: [
    {
      fields: ['user_id', 'cookie_id']
    }
  ]
  
}
///MysqlBDConnection.getQueryInterface().createTable("user",userTable)//create the table


Session.init(SessionSchma, userTableConnector) ;
//Session.sync({ alter: true })///
return Session
}