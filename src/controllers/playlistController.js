import {
    getPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    createPlaylist,
    getPlaylistSong
} from '../services/playlistService'

const handleCreatePlaylist = async (req, res) => {
    const response = await createPlaylist(req.body)
    return res.status(200).json(response)
}

const handleGetPlaylist = async (req, res) => {
    const userId = req.params.id
    const response = await getPlaylist(userId);
    console.log(response)
    if(!response.errorCode) return res.status(500).json(response)
    return res.status(200).json(response)
}

const handleGetPlaylistSong = async (req, res) => {
    const {playlistId, userId} = req.params
    const response = await getPlaylistSong(playlistId, userId)
    console.log("get playlist song:", response)
    if(!response.errorCode) return res.status(500).json(response)
    return res.status(200).json(response)
}

const handleAddToPlaylist = async (req, res) => {
    const {songId, playlistId} = req.body
    const data = await addSongToPlaylist(playlistId, songId)
    return res.status(200).json(data)
}
const handleRemoveFromPlaylist = async (req, res) => {
    const {songId, playlistId} = req.body
    const data = await removeSongFromPlaylist(playlistId, songId)
    return res.status(200).json(data)
}

export {
    handleGetPlaylistSong,
    handleCreatePlaylist, handleGetPlaylist, handleAddToPlaylist, handleRemoveFromPlaylist
}