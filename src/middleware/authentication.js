require('dotenv').config()
const jwt =require("jsonwebtoken");
const { send } = require('process');

const betterToken =(token)=>{
    return new Promise((resolve,reject)=>{
        var decoded = jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
            if(err){
                return reject(err)
            }
            return resolve(decoded)
        });
    })
}

const authenticate=async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(400).send({message:"Authentication tokens not found"})
    }
    if(!req.headers.authorization.startsWith("Bearer")){
        return res.status(400).send({message:"Authentication tokens not found"})
    }
    const token=req.headers.authorization.trim.split("")[1]

    let decoded;
    try{
        decoded =await betterToken(token)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({message:"Authentication tokens not found"})
    }

    console.log("decoded:",decoded)
    req.user =decoded.user
    return next()

}

module.exports=authenticate