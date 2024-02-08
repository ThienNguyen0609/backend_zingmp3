import { getAllSong, getCurrentSong, updateCurrentSong } from "../services/songService"

const handleGetAllSong = async (req, res) => {
    const response = await getAllSong()
    if(!response.errorCode) return res.status(500).json(response)
    return res.status(200).json(response)
}

const handleGetCurrentSong = async (req, res) => {
    const {userId} = req.params
    const response = await getCurrentSong(userId)
    return res.status(200).json(response)
}

export {
    handleGetAllSong,
    handleGetCurrentSong
}