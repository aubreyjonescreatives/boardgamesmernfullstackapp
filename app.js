import express from "express"; 
import path from 'path'
import helmet from 'helmet'
import bodyParser from "body-parser";
import morgan from "morgan";
import { fileURLToPath } from "url";
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


app.use(express.json())
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false })); 
app.use(morgan("common")); 
app.use(bodyParser.json({ limit: "30mb", extended: true })); 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));


//const port = process.env.PORT || 8080



// lets just forget about CORS

app.use(cors())


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

// SOME COOL ROUTES


app.use('/api', apiRouter)

app.use('/populargame', populargameRouter)

app.use('/crazygame', crazygameRouter)


app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})


// mongoDB connection

const PORT = process.env.PORT || 8080

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_CONN_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(() => {
    app.listen(PORT, () => console.log(`Server Started: ${PORT}`)); 
 
}).catch((error) => console.log(`${error} uh oh. That didn't work.`));

