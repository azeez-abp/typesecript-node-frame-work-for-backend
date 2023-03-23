

export const CONFIG_PROD = 
{
    MONGO_URI:process.env.MONGO_URI,
    MYSQL_URI:{
        HOST_NAME:process.env. MYSQL_LOCAL_HOST,
        USER:process.env.MYSQL_LOCAL_USER,
        PASSWORD:process.env.MYSQL_LOCAL_PASSWORD,
        DB:process.env.MYSQL_LOCAL_DB
        }
}