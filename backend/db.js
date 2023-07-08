const mongoose = require("mongoose") // common js - dynamic, no default export, used in node.js
require('dotenv').config();

// const mongoURI = "mongodb://127.0.0.1:27017/iNoteBook"

// connection with mongodb atlas
const mongoURI = "mongodb+srv://LoneWolf:<password>@cluster0.luv9pon.mongodb.net/iNoteBook?retryWrites=true&w=majority" ;

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
