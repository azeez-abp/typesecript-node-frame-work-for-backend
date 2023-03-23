
export const headerCredential  = (req:any, res:any, next:any)=>{
     
    res.header('Access-Control-Allow-Credentials',true)

    next()
    
}
