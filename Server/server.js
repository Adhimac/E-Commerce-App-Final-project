const express = require('express')
const app = express()
const cors = require('cors')
const mongoConnect = require('./Data-base/connect')
mongoConnect()
const dotenv = require('dotenv')
dotenv.config()

const authRouter = require('./Routes/auth-route')
const productRouter = require('./Routes/product-route')

app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10240mb"}));
app.use(authRouter)
app.use(productRouter)
const port = process.env.PORT  || 4000
app.listen(port , ()=>{
    console.log(`server running at http://localhost:${port}`);
    
})