const mongoose = require("mongoose")
const express = require("express")
const bcrypt = require("bcrypt")

//////////////////////////////////////////////////////////////////////////////
const { userModel } = require("../model/userModel")

const SignupRoute = express.Router()

SignupRoute.post("/", async (req, res) => {
    try {
        const { email, password } = req.body

        const userPresent = await userModel.findOne({ email })
        if (userPresent) {
            return res.status(401).json({ msg: "User Already Registered" })
        }

        const hash = await bcrypt.hash(password, 4);
        const user = new userModel({ email, password: hash })
        await user.save()
        res.status(200).json({ msg: "User Registered Successfully" })

    } catch (error) {
        console.log(error)
        res.status(501).json({ msg: error.message })
    }
})

module.exports = {
    SignupRoute
}