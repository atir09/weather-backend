const express=require("express")
const Redis=require("ioredis")


///////////////////////////////////////////////////////////////////////////////////////
const {redis}=require("../db")
///////////////////////////////////////////////////////////////////////////////////////


const logoutRoute=express.Router()

logoutRoute.get("/",async(req,res)=>{
    try {
        const token=req?.headers?.authorization.split(" ")[1]
        const refreshToken=req?.headers?.authorization.split(" ")[2]

        const result = await redis.sadd("blacklist",token,refreshToken)

        res.status(201).json({msg:"Logged Out Successfully"})


    } catch (error) {
        console.log(error)
        res.status(501).json({msg:error.message})
    }
})

module.exports={
    logoutRoute
}