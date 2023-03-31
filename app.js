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

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

mongoose.set('useFindAndModify', false)



const port = process.env.PORT || 8080


app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(helmet())

app.use(compression())

app.use(express.static('public'))

// lets just forget about CORS

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH' ]
}));



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
})


// connect server to client for production

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
	app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}
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