import express from "express"; 
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
//import bodyParser from 'body-parser'
import { apiRouter} from './routes/api.route.js'
import { crazygameRouter} from './routes/crazygame.route.js'
import { populargameRouter } from './routes/populargame.route.js'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'



const __dirname = path.dirname(new URL(import.meta.url).pathname)

mongoose.set('useFindAndModify', false)

dotenv.config()

const port = process.env.PORT || 8080

const app = express()

app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(helmet())

app.use(compression())

app.use(express.static('public'))


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
})


//app.use(express.static(path.resolve(__dirname, 'client/build')))

app.use('/api', apiRouter)

app.use('/populargame', populargameRouter)

app.use('/crazygame', crazygameRouter)

app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

const main = async () => {
    await mongoose.connect(`${process.env.DB_CONN_STRING}`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })


    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

}

main()