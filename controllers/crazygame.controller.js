import { CrazyGame } from '../models/crazygame.js'



export const postaddCrazyGame = ((req, res) => {

const game = new CrazyGame({
    id: req.body.id,
    name: req.body.name, 
    image_url: req.body.image_url, 
    description: req.body.description, 
    price: req.body.price 
})
console.log(game)
game.save() //save method is provided by Mongoose
res.json(game)


})




export const getAllCrazyGames = ((req, res) => {
    CrazyGame.find()
    .then(games => {
        res.json(games)
    })
    .catch(err => console.log(err))
})

export const getCrazyGames = async (req, res) => {
    const games = await CrazyGame.find()
    if (!games) {
        return res.status(400).json({Message: `No games found`})
    }
    res.json(games)
}

export const getCrazyGameById = async (req, res) => {
    const gameId = req.body.gameId
    console.log(gameId)
    try{
    const game = await CrazyGame.findById(gameId)
    if (!game) {
        return res.status(404).json({Message: 'Game Not Found'})
    }
    res.json(game)
} catch(err) {
    res.status(400).json({Message: `Invalid ID: ${err}`})
}
}

export const putEditCrazyGame = async (req, res) => {
    const gameId = req.body.data.gameId
    const updatedObj = {
        name: req.body.data.name,
        image_url: req.body.data.image_url, 
        description: req.body.data.description, 
        price: req.body.data.price 
    } 
    try {
    const game = await CrazyGame.findByIdAndUpdate(gameId, updatedObj, {new: true})
    console.log(`Updated the product ${game}`)   
    res.status(200).json(game)
    } catch(err) {
        res.status(400).json({Message: `Could not update: ${err}`})
    }


}

export const deleteCrazyGame = async (req, res) => {
    const gameId = req.body.gameId
    console.log(gameId)
    try {
        const deletedGame = await CrazyGame.findByIdAndRemove(gameId)
            if (!deletedGame) {
               return res.status(400).json({Message: `Game to Delete Not Found.`})
            }
            console.log(`Deleted the product ${deletedGame}`)
            res.sendStatus(200)
        } catch (err) {
            res.status(400).json({Message: `Invalid ID: ${err}`})
        }

    }
    