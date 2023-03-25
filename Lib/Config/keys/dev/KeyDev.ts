import dotenv from "dotenv"
dotenv.config()
export const CONFIG_DEV:any  = {
    'MONGO_URI':process.env.MONGO_LOCAL,

     'MAIL_URL':{
        h:process.env.MAIL_HOST,
        u:process.env.MAIL_USER,
        p:process.env.MAIL_PASSWORD,
    
     },

     'MYSQL_URI': { 
        HOST_NAME:process.env.MYSQL_LOCAL_HOST,
        USER:process.env.MYSQL_LOCAL_USER,
        PASSWORD:process.env.MYSQL_LOCAL_PASSWORD,
        DB:process.env.MYSQL_LOCAL_DB
       
     },
    'COOKIE_NAME':process.env.COOKIE_NAME,
    'ACCESS_TOKEN':process.env.ACCESS_TOKEN,
    'REFRESH_TOKEN':process.env.REFRESH_TOKEN,
    'SESSION_NAME':process.env.SESSION_NAME,
    'SESSION_TOKEN':process.env.SESSION_TOKEN,
    'SESSION_TIME':process.env.SESSION_TIME,

    'ROOT_FOLDER':'nodemc',
    'DB_TYPE':process.env.DB_TYPE
}