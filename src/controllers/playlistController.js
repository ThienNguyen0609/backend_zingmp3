import {
    getMyPlaylistById,
    addSongToPlaylist,
    removeSongFromPlaylist
} from '../services/playlistService'

const getMyPlaylist = async (req, res) => {
    const userId = req.params.id
    const data = await getMyPlaylistById(userId);
    return res.send(data)
}

const addToPlaylist = async (req, res) => {
    const userId = req.params.userId
    const songId = req.params.songId
    const data = await addSongToPlaylist(userId, songId)
    return res.status(200).json(data)
}
const removeFromPlaylist = async (req, res) => {
    const userId = req.params.userId
    const songId = req.params.songId
    const data = await removeSongFromPlaylist(userId, songId)
    console.log(data)
    return res.status(200).json(data)
}

export {
    getMyPlaylist, addToPlaylist, removeFromPlaylist
}