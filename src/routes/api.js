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
    handleGetAllSong,
    handleGetCurrentSong,
    handleGetFavoriteSong,
    handleUpdateFavoriteSong
} from '../controllers/songController'

import {
    handleCreatePlaylist,
    handleDeletePlaylist,
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
    // router.put('/user/update', checkAuthority, handleUpdate)
    router.put('/user/update', handleUpdate)
    router.post('/user/authenticated', checkAuthenticated)
    router.post('/user/register', handleRegister)
    router.post('/user/login', handleLogin)
    router.post('/user/logout', handleLogout)
    // router.post('/user/permission', checkAuthority, handleCheckUserPermission)
    router.post('/user/permission', handleCheckUserPermission)

    // forgot password
    router.post('/user/check-send-email', handleCheckUser, handleSendEmail)
    router.post('/user/OTP-verify', handleVerifyOTP)
    router.post('/user/change-password', handleChangePassword)


    //song
    router.get('/song', handleGetAllSong)
    router.get('/song/current/get/:userId', handleGetCurrentSong)
    router.get('/song/favorite/get/:userId', handleGetFavoriteSong)
    router.post('/song/favorite/update', handleUpdateFavoriteSong)

    //playlist
    router.post('/playlist/create', handleCreatePlaylist)
    router.post('/playlist/delete', handleDeletePlaylist)
    router.get('/playlist/get/:id', handleGetPlaylist)
    router.get('/playlist/get/item/:playlistId/:userId', handleGetPlaylistSong)
    router.post('/playlist/add', handleAddToPlaylist)
    router.post('/playlist/remove', handleRemoveFromPlaylist)

    //search
    router.post('/search', findApiSong)
    router.post('/search/all', findApiAllSong)

    // get artist
    router.get('/artist', getApiAllArtists)
    router.get('/artist/:artistName', getArtistByName)

    app.use('/api', router)
}

export default initApiRouter