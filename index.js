import express from "express"
import cors from "cors"
import "dotenv/config"
import route from "./routes/index.js"
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
	limit: 5, 

})

const server = express()
server.use(cors())
server.use(express.json())
server.use(limiter)
server.set('trust proxy',1)

server.use("/api",route)

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> console.log(`Running at ${PORT}!`))