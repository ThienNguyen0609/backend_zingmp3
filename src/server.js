require('dotenv').config()
import express from 'express'
import confidViewEngine from './config/viewEngine'
import configCORS from './config/cors'
import initWebRouter from './routes/web'
import initApiRouter from './routes/api'
import initSpotifyRouter from './routes/spotify.api'

const port = process.env.PORT || 6969

const app = express()

// config view engine
configCORS(app)
confidViewEngine(app)

// init web router
initWebRouter(app)
initApiRouter(app)
initSpotifyRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`)
})