const express = require("express")

const app =express()

const connect = require("./configs/dbs")
app.use(express.json())




app.listen(5000, async() => {
    try{
        await connect()
        console.log("listen to the PORT 5000")
    }
    catch(err){
        console.log("Error")
    }
})