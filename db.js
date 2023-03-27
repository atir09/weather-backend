const  Redis  = require("ioredis")
const mongoose=require("mongoose")
require("dotenv").config()

const connection= mongoose.connect(process.env.MongoURL)

const redis=new Redis()

module.exports={
    connection,redis
}