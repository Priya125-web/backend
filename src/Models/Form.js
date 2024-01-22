const mongoose = require("mongoose")
const form = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
        
    },

    pNo:{
        type:Number,
        required:true
    },

    message:{
        type:String,
        required:true
        
    },

    interest:{
        type:String,
        required:true
        
    }



})

module.exports = mongoose.model("forms", form)