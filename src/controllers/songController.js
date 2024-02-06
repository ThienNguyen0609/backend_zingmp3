import { getAllSong } from "../services/CRUDService"

const getApiAllSong = async (req, res) => {
    const response = await getAllSong()
    if(!response.errorCode) return res.status(500).json(response)
    return res.status(200).json(response)
}
const getApiSongItem = (req, res) => {

}
const updateApiSong = (req, res) => {

}

export {
    getApiAllSong,
getApiSongItem,
updateApiSong,
}