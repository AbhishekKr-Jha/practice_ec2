
require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const router = require('./router/routes.js')
app.use(cors())





app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/backend/api/v1',router)


app.get('/',(req,res)=>res.send('This is the backend running on port 5000') )

app.listen(process.env.PORT,()=>console.log(`the server is running on  port : http://localhost:${process.env.PORT}`))


