const express = require('express')
const app = express()
const mongoConnect = require('./Data-base/connect')
mongoConnect()
const dotenv = require('dotenv')
dotenv.config()

const authRouter = require('./Routes/auth-route')


app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10240mb"}));
app.use(authRouter)
const port = process.env.PORT  || 4000
app.listen(port , ()=>{
    console.log(`server running at http://localhost:${port}`);
    
})