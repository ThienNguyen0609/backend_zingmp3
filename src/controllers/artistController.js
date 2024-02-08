import {
    getAllArtists,
    getArtistInfo
} from "../services/artistService"

const getApiAllArtists = async (req, res) => {
    const response = await getAllArtists()
    return res.status(200).json(response)
}

const getArtistByName = async (req, res) => {
    const artistName = req.params.artistName.split("-").join(" ")
    const response = await getArtistInfo(artistName)
    return res.status(200).json(response)
}

export {
    getApiAllArtists,
    getArtistByName
}