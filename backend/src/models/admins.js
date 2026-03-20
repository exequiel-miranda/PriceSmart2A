/*
name 
email
password
isverified
*/

import {Schema, model} from "mongoose";

const adminSchema = new Schema({
    name:{
        type: String
    },  
    email:{
        type: String
    },
    password:{
        type: String
    },
    isverified:{
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
});

export default model("Admin", adminSchema)
