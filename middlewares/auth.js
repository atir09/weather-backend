const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {redis}=require("../db")
const Redis=require("ioredis")

//////////////////////////////////////////////////////////////////////////////
const { userModel } = require("../model/userModel")

//////////////////////////////////////////////////////////////////////////////


const auth = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1]

        // Find If the token is blacklisted
        const resultFind=await redis.sismember("blacklist",token)
        if(resultFind==1){
            return res.status(401).json({msg:"Token Expired,You have Logged Out"})
        }

        const decoded = jwt.verify(token, process.env.jwtkey);
        const { userId } = decoded

        const user = await userModel.findById(userId)
        if (!user) {
           return res.status(401).json({ msg: "No User Found With this email" })
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        if(error.message=="jwt expired"){
            return res.status(403).json({msg:"jwt expired"})
        }else{
            return res.status(501).json({msg:error.message})
        }
        
        
    }

}

//////////////////////////////////////////////////////////////////////////////

module.exports={
    auth
}