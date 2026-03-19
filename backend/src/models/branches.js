/*
Campos: 
name
address
schedule
isActive
*/

import {Schema, model} from 'mongoose';

const branchSchema = new Schema({
    name : {
        type : String
    },
    address: {
        type : String
    },
    schedule: {
        type : String
    },
    isActive: {
        type : Boolean  
    },

},{
    timestamps : true,
    strict: false
})
export default model("Branches", branchSchema)