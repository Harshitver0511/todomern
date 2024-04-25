const jwt = require('jsonwebtoken');
require('dotenv').config();
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */


const AuthMiddlewares = (req,res,next)=>{
    if(req.headers['auth']==undefined){
        return res.status(401).json({message: 'Unauthorized'})
       
    }
    const token = req.headers['auth'];
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
       
        req.UserId = decoded.UserId;
        console.log(decoded.UserId);
        
        next();
    
    }
    catch(err){
        return res.status(401).json({message: 'Unauthorized'})
    }
}
module.exports = AuthMiddlewares;