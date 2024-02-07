import {
    getAllArtists,
    getArtistInfo
} from "../services/artistService"

const getApiAllArtists = async (req, res) => {
    const artists = await getAllArtists()
    console.log("artists: ", artists)
    return res.send(artists)
}

const getArtistByName = async (req, res) => {
    const artistName = req.params.artistName.split("-").join(" ")
    const data = await getArtistInfo(artistName)
    return res.status(200).send({
        message: "ok",
        artistInfo: data
    })
}

export {
    getApiAllArtists,
    getArtistByName
}