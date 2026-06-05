/*
name
phone
image
cars: {
	brand
	modelo
	plate
}
isActive
*/

import {Schema, model} from "mongoose"

const deliveryDriverSchema = new Schema({
    name: {type: String},
    phone: {type: String},
    image: {type: String},
    public_id: {type: String},
    cars: [
        {
            brand: {type: String},
            model:{type: String},
            plate: {type: String}
        }
    ],
    isActive: {type: Boolean}
},{
    timespamps: true,
    strict: false
})

export default model("deliveryDriver", deliveryDriverSchema)