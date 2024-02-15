import { getAllSong, getCurrentSong, getFavoriteSong, updateFavoriteSong } from "../services/songService"

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

const handleGetFavoriteSong = async (req, res) => {
    const {userId} = req.params
    const response = await getFavoriteSong(userId)
    return res.status(200).json(response)
}

const handleUpdateFavoriteSong = async (req, res) => {
    const {userId, favorSongIds} = req.body
    const response = await updateFavoriteSong(userId, favorSongIds)
    return res.status(200).json(response)
}

export {
    handleGetAllSong,
    handleGetCurrentSong,
    handleGetFavoriteSong,
    handleUpdateFavoriteSong
}