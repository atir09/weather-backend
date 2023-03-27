const express=require("express")
const jwt=require("jsonwebtoken")
require("dotenv").config()


//////////////////////////////////////////////////////////////////////////////
const { userModel } = require("../model/userModel")

//////////////////////////////////////////////////////////////////////////////

const refreshTokenRoute=express.Router()

refreshTokenRoute.get("/",async(req,res)=>{
    try {
        const refreshTokenOld=req?.headers?.authorization?.split(" ")[1]

        const decoded = jwt.verify(refreshTokenOld, process.env.refreshkey);

        if(!decoded){
            return res.status(402).json({msg:"Refresh Token Expire, Plz Login Again"})
        }
        const { userId } = decoded

        const user = await userModel.findById(userId)
        if (!user) {
           return res.status(401).json({ msg: "No User Found With this email" })
        }

        const token=jwt.sign({userId:user._id},process.env.jwtkey,{expiresIn:"2m"})
        const refreshToken=jwt.sign({userId:user._id},process.env.refreshkey,{expiresIn:"3d"})

        res.status(201).json({token,refreshToken})
    } catch (error) {
        console.log(error)
        if(error.message=="jwt expired"){
            return res.status(403).json({msg:"Refresh jwt expired"})
        }else{
            return res.status(501).json({msg:error.message})
        }
    }
})


module.exports={
    refreshTokenRoute
}