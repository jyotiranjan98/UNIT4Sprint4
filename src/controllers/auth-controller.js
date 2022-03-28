const jwt =require("jsonwebtoken")
const User =require("../models/user")
require('dotenv').config()

const newtoken =(user) => {
    // console.log(process.env.SCRET_KEY)
    return jwt.sign({user},
        process.env.SCRET_KEY);
}

// REGISTER
const register =async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send(({message:"Email already exists"}))
        }
        user =await User.create(req.body)
        const token =newtoken(user)

        return res.status(200).send({user,token})
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

// LOGIN
const login =async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send(({message:"Wrong email or password"}))
        }
        user =await User.create(req.body)
        const token =newtoken(user)
        // const token =jwt.sign({user},'mernstack')

        return res.status(200).send({user,token})
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports ={register,login}