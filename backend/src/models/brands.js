/*
    Campos:
    name
    slogan
    address
    isActive
*/
 
import {Schema, model} from "mongoose";
 
const brandSchema = new Schema({
    name:{
        type: String
    },
    slogan:{
        type: String
    },
    address:{
        type: String
    },
    isActive:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Brand", brandSchema) 