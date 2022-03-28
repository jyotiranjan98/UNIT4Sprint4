const express = require(express)
const Todo =require("../models/todo")
const router =express.Router

router.post("",async(req,res)=>{
    try{
        const todo =await Todo.create(req,body)
        return res.status(200).send(todo)

    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.get("",async(req,res)=>{
    try{
        const todos =await Todo.find().lean().exec()
        return res.status(200).send(todos)

    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.get("/:id",async(req,res)=>{
    const todo =await Todo.findById().lean().exec()
    returnres.status(200).send(todo)
})