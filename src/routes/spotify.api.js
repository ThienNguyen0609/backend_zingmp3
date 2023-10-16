import express from 'express'
import { 
    getToken,
    getArtistById,
    getAddArtistPage 
} from '../controllers/spotifyControler'

const router = express.Router()

const initSpotifyRouter = (app) => {
    router.get("/get/token", getToken)

    router.post("/get/artist", getArtistById)

    router.get("/artist-form", getAddArtistPage)

    app.use("/spotify", router)
}

export default initSpotifyRouter