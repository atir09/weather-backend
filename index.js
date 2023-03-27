const express=require("express")
const app=express()
const cors=require("cors")

/////////////////////////////////////////////////////////////////////////////////////////////////

const {connection}=require("./db")
const {SignupRoute}=require("./router/signupRoute")
const {loginRoute}=require("./router/loginRoute")
const {auth}=require("./middlewares/auth")
const {refreshTokenRoute}=require("./router/refreshTokenRoute")
const {logoutRoute}=require("./router/logout")
const {weatherRoute}=require("./router/weatherRoute")
const {logger}=require("./middlewares/logger")

/////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json())
app.use(cors())
app.use(logger)
////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/signup",SignupRoute)

app.use("/login",loginRoute)

app.use("/refreshToken",refreshTokenRoute)

app.use("/weather",weatherRoute)

app.use("/logout",logoutRoute)




/////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Server Running on port:8080")
    } catch (error) {
        console.log(error)
    }
})