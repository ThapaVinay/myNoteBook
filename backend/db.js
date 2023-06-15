const mongoose = require("mongoose") // common js - dynamic, no default export, used in node.js
const mongoURI = "mongodb://127.0.0.1:27017/"

const conectToMongo = () => {
    try{
        mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch(error){
        console.log(error);
    }
    console.log("connected to server ..")
    
}

module.exports = conectToMongo;