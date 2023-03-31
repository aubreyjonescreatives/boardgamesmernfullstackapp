import { PopularGame } from '../models/populargame.js'



export const postaddGame = ((req, res) => {

const game = new PopularGame({
    id: req.body.data.id,
    name: req.body.data.name, 
    image_url: req.body.data.image_url, 
    description: req.body.data.description, 
    price: req.body.data.price 
})
console.log(game)
game.save() //save method is provided by Mongoose
res.json(game)


})




export const getAllGames = ((req, res) => {
    PopularGame.find()
    .then(games => {
        res.json(games)
    })
    .catch(err => console.log(err))
})

export const getGames = async (req, res) => {
    const games = await PopularGame.find()
    if (!games) {
        return res.status(400).json({Message: `No games found`})
    }
    res.json(games)
}

export const getGameById = async (req, res) => {
    const gameId = req.body.gameId
    console.log(gameId)
    try{
    const game = await PopularGame.findById(gameId)
    if (!game) {
        return res.status(404).json({Message: 'Game Not Found'})
    }
    res.json(game)
} catch(err) {
    res.status(400).json({Message: `Invalid ID: ${err}`})
}
}

export const putEditGame = async (req, res) => {
    const gameId = req.body.data.gameId
    const updatedObj = {
        name: req.body.data.name,
        image_url: req.body.data.image_url, 
        description: req.body.data.description, 
        price: req.body.data.price 
    } 
    try {
    const game = await PopularGame.findByIdAndUpdate(gameId, updatedObj, {new: true})
    console.log(`Updated the game ${game}`)   
    res.status(200).json(game)
    } catch(err) {
        res.status(400).json({Message: `Could not update: ${err}`})
    }


}

export const deleteGame = async (req, res) => {
    const gameId = req.body.gameId
    console.log(gameId)
    try {
        const deletedGame = await PopularGame.findByIdAndRemove(gameId)
            if (!deletedGame) {
               return res.status(400).json({Message: `Game to Delete Not Found.`})
            }
            console.log(`Deleted the product ${deletedGame}`)
            res.sendStatus(200)
        } catch (err) {
            res.status(400).json({Message: `Invalid ID: ${err}`})
        }

    }
    