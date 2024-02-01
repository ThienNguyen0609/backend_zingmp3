import express from 'express'
import {
    handleGet,
    handleUpdate,
    handleLogin, 
    handleLogout,
    handleRegister, 
    checkAuthority,
    checkAuthenticated, 
    handleCheckUserPermission
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
    getMyPlaylist, 
    addToPlaylist, 
    removeFromPlaylist
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

    router.get('/library/music', getApiAllSong)
    router.get('/library/music/:id', getApiSongItem)
    router.put('/library/music', updateApiSong)

    router.get('/myPlaylist/:id', getMyPlaylist)
    router.post('/myPlaylist/:userId/:songId/add', addToPlaylist)
    router.post('/myPlaylist/:userId/:songId/remove', removeFromPlaylist)

    router.post('/search', findApiSong)
    router.post('/search/all', findApiAllSong)

    router.get('/artist', getApiAllArtists)
    router.get('/artist/:artistName', getArtistByName)

    // router.get('song/play', )

    app.use('/api', router)
}

export default initApiRouter