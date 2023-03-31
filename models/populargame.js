import mongoose from 'mongoose'


const Schema = mongoose.Schema 


const populargameSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    image_url: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: false 
    }, 
    price: {
        type: String, 
        required: true 
    },
    id: {
        type: String, 
        required: true
    }
})

export const PopularGame = mongoose.model('Popular Game', populargameSchema)