const express = require("express")

const weatherRoute = express.Router()

weatherRoute.get("/", async(req, res) => {
   try {
    const city = req.query.q
    fetch(`http://api.weatherapi.com/v1/current.json?key=b27546c663c94c81b4a104946232703&q=${city}&aqi=no
    `)
    .then((res)=>{return res.json()})
    .then((data)=>{
        console.log(data)
        res.status(200).json(data)})
   } catch (error) {
        console.log(error)
        res.status(500).send({msg:error.message})
   }
})

module.exports={
    weatherRoute
}