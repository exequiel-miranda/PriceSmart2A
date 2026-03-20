/*
Campos:
    name
    lastName
    salary
    DUI
    phone
    email
    password
    idBranches
*/

import mongoose, { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    name:{
        type: String
    },
    lastName: {
        type: String
    },
    salary:{
        type: Number
    },
    DUI:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String
    },
    idBranches: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branches"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Employee", employeeSchema)

