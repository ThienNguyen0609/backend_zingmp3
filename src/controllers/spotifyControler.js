import {
    getSpotifyToken,
    getArtistFromSpotifyById,
    addArtistToDatabase
} from "../services/spotifyService"

const getToken = async (req, res) => {
    const data = await getSpotifyToken()
    return res.render("tokenPage.ejs", {data: data})
}

const getArtistById = async (req, res) => {
    const artistId = req.body.spotifyId
    const token = req.body.token
    const message = await getArtistFromSpotifyById(artistId, token)
    if(message.errorCode === 0) {
        const data = await addArtistToDatabase(message.data)
        console.log(data)
    }
    return res.redirect("/artists")
}

const getAddArtistPage = (req, res) => {
    return res.render("addArtist.ejs")
}

export {
    getToken,
    getArtistById,
    getAddArtistPage,
}