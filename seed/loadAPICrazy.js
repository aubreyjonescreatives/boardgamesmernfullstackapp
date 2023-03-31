import axios from 'axios'; 
import { CrazyGame } from '../models/crazygame.js'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const seedMongo = async () => {
    await mongoose.connect(`${process.env.DB_CONN_STRING}`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })


    const options = {
        method: 'GET', 
        url: 'https://api.boardgameatlas.com/api/search?order_by=year_published&pretty=false&client_id=JLBr5npPhV', 
      //  params: {}, 
      //  headers: {'access-token': process.env.SUPERHERO_API_KEY}
    } 
    try {
        const response = await axios.request(options)
        console.log(response.data.games[0])
      // await addCard(response.data.cards[0])
       await addGames(response.data.games)
        await mongoose.connection.close() 
    } catch (error) {
        console.error(error)
    }

}




const addGame = async (oneGame) => {

    const games = new CrazyGame({
        name: oneGame.name, 
        url: oneGame.url, 
        image_url: oneGame.image_url, 
        thumb_url: oneGame.thumb_url,
        description: oneGame.description,
        description_preview: oneGame.description_preview, 
        price: oneGame.price, 
        id: oneGame.id, 
        type: oneGame.type, 
        min_players: oneGame.min_players, 
        max_players: oneGame.max_players, 
        min_playtime: oneGame.min_playtime
    })
   await games.save() //save method is provided by Mongoose
   console.log('Added successfully')
    
    
    }

    const addGames = async (gameList) => {
        for (let game of gameList) {
            console.log(game)
            await addGame(game)
        }
    }

    seedMongo()
    