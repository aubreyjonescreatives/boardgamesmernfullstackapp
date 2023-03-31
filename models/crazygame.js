import mongoose from 'mongoose'


const Schema = mongoose.Schema 


const crazygameSchema = new Schema({
    name: {
        type: String, 
        required: false
    }, 
    url: {
        type: String, 
        required: false
    },
    image_url: {
        type: String, 
        required: false
    }, 
    thumb_url: {
        type: String, 
        required: false
    },
    description: {
        type: String, 
        required: false 
    }, 
    description_preview: {
        type: String, 
        required: false
    },
    price: {
        type: String, 
        required: false 
    },
    id: {
        type: String, 
        required: false
    },
    type: {
        type: String, 
        required: false
    }, 
    min_players: {
        type: String, 
        required: false
    }, 
    max_players: {
        type: String, 
        required: false
    }, 
    min_playtime: {
        type: String, 
        required: false
    }
})

export const CrazyGame = mongoose.model('crazygame', crazygameSchema)