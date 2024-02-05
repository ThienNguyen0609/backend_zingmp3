import express from 'express'
import {
    handleGet,
    handleUpdate,
    handleLogin, 
    handleLogout,
    handleRegister, 
    checkAuthority,
    checkAuthenticated, 
    handleCheckUserPermission,
    handleCheckUser,
    handleSendEmail,
    handleChangePassword,
    handleVerifyOTP
} from '../controllers/userController'
import {
    findApiSong,
    findApiAllSong
} from '../controllers/searchController'

import {
    getApiAllSong,
    getApiSongItem,
    updateApiSong
} from '../controllers/songController'

import {
    handleCreatePlaylist,
    handleGetPlaylist, 
    handleGetPlaylistSong,
    handleAddToPlaylist, 
    handleRemoveFromPlaylist
} from '../controllers/playlistController'

import {
    getApiAllArtists,
    getArtistByName
} from '../controllers/artistController'

const router = express.Router()

const initApiRouter = (app) => {

    router.get('/user/get/:id', handleGet)
    router.put('/user/update', checkAuthority, handleUpdate)
    router.post('/user/authenticated', checkAuthenticated)
    router.post('/user/register', handleRegister)
    router.post('/user/login', handleLogin)
    router.post('/user/logout', handleLogout)
    router.post('/user/permission', checkAuthority, handleCheckUserPermission)

    // forgot password
    router.post('/user/check-send-email', handleCheckUser, handleSendEmail)
    router.post('/user/OTP-verify', handleVerifyOTP)
    router.post('/user/change-password', handleChangePassword)

    router.get('/library/music', getApiAllSong)
    router.get('/library/music/:id', getApiSongItem)
    router.put('/library/music', updateApiSong)

    router.post('/playlist/create', handleCreatePlaylist)
    router.get('/playlist/get/:id', handleGetPlaylist)
    router.get('/playlist/get/item/:playlistId/:userId', handleGetPlaylistSong)
    router.post('/playlist/add', handleAddToPlaylist)
    router.post('/playlist/remove', handleRemoveFromPlaylist)

    router.post('/search', findApiSong)
    router.post('/search/all', findApiAllSong)

    router.get('/artist', getApiAllArtists)
    router.get('/artist/:artistName', getArtistByName)

    // router.get('song/play', )

    app.use('/api', router)
}

export default initApiRouter