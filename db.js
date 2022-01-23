const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


const connection = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MOngodb Compass")
    })
}

module.exports =  connection;