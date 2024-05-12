const express = require("express")
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()

const getAllTasks = async (req, res) => {
    const user = await User.find({})
    res.status(200).json({user: user})
}
const register = async (req, res) => { 
    const errors = validationResult(req)
    if(errors.isEmpty()){ 
        const  { name, username, email, password } = req.body
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userExists = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if(userExists){
            return res.status(400).json({message: 'User already exists'})
        }
        // password = hashedPassword;
         try{
                const user = await  User.create({
                    name:name,
                    username:username,
                    email:email,
                    password:hashedPassword
                })
                const token = jwt.sign({UserId: user._id}, process.env.TOKEN_SECRET)

                return res.status(200).json({message: 'User created', "UserId":user._id, "token":token});
                


         }
         catch(err){
             console.log(err)
         }
        res.status(200).send('Data is valid')
    }
    res.status(401).json({message: 'Data is not valid',"errors":errors.mapped()})
}  
const login = async (req, res) => {
    const  { username, password } = req.body
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const user = await User.findOne({username:username})
        if(!user){
             return res.status(404).json({message: 'User not found'});
        }
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass){
            return res.status(400).json({message: 'Invalid password'});
        }
        const token = jwt.sign({UserId: user._id}, process.env.TOKEN_SECRET)
        return res.status(200).json({message: 'User logged in', "UserId":user._id, "token":token});

    }
    res.status(404).json({message: 'Data is not valid',"errors":errors.mapped()})
}
const todo = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({message: 'Data is not valid',"errors":errors.mapped()})
    }
    try{
        const todo = await Todo.create({
            desc:req.body.desc,
            UserId:req.UserId
        })


        if(todo){
            const id= req.UserId
            console.log(id)
            const user = await User.findByIdAndUpdate(id,
                {$push:{todos:todo._id}
            })
            return res.status(200).json({message: 'Todo created', "Todo":todo,"userid":id,"hii":"hii"});
        }

    }
    catch(err){
        console.log(err)
    }
}
const fetchTodo = async (req, res) => {
    const id = req.UserId;
    const user = await User.findById(id).populate('todos')
    res.status(200).json({user: user})
}

const isDone = async(req,res)=>{
      const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({message: 'todo id is required',"errors":errors.mapped()})
    }
    try{
        const todo = await Todo.findOneAndUpdate({
            _id:req.body._id,
            UserId:req.UserId,
        }
        ,
        [
            {
                $set:{
                    "isDone":{
                        $not:["$isDone"]
                    }
                }
            }
        ]
        );
        if(todo){
            return res.status(200).json({message: 'Todo updated', "Todo":todo,"UserId":req.UserId});
        }
    }
    catch(err){
        return res.status(400).json({message: 'Todo not found'})
    }
}    
const del =async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({message: 'todo id is required',"errors":errors.mapped()})
    }
    try{ 
        const todo = await Todo.findOneAndDelete({
            _id:req.body._id,
            UserId:req.UserId,
        });
        if(todo){
            return res.status(200).json({message: 'Todo deleted', "Todo":todo,"UserId":req.UserId});
        }
    }
    catch(err){
        return res.status(400).json({message: 'Todo not found'})
    }
}

module.exports = {
    getAllTasks,
    register,
    login,
    todo,
    fetchTodo,
    isDone,
    del
}   