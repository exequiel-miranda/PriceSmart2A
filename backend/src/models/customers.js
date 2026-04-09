/*
Campos:
    name
    lastName
    birthdate
    email
    password
    isVerified
    loginAttempts
    timeOut 
*/

import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    birthdate: {type: Date},
    email: {type: String},
    password: {type: String},
    isVerified: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Date}
},{
    timestamps: true,
    strict: false
})

export default model("Customers", customerSchema)