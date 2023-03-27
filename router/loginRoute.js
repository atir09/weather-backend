const express = require("express")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

//////////////////////////////////////////////////////////////////////////////
const { userModel } = require("../model/userModel")



const loginRoute = express.Router()

loginRoute.post("/", async (req, res) => {
    try {
        const { email, password } = req.body
        const user=await userModel.findOne({email})

        if(!user){
            return res.status(401).json({msg:"User Not Registerd, Plz Signup"})
        }

        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(401).json({msg:"Incorrect Password"})
        }
         
        const token=jwt.sign({userId:user._id},process.env.jwtkey,{expiresIn:"2m"})
        const refreshToken=jwt.sign({userId:user._id},process.env.refreshkey,{expiresIn:"3d"})

        res.status(201).json({token,refreshToken})
        
    } catch (error) {
        console.log(error)

        res.status(501).json({msg:error.message})
    }
})


module.exports={
    loginRoute
}