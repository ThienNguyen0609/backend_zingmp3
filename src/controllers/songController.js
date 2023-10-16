import { getAllSong } from "../services/CRUDService"

const getApiAllSong = async (req, res) => {
    const data = await getAllSong()
    return res.status(200).json(data)
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