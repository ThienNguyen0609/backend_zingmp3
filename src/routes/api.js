import express from 'express'
import { 
    getApiAllUser, 
    getApiUserItem, 
    updateApiUser, 
    deleteApiUser
} from '../controllers/controller.api'
import {
    handleLogin, 
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
    router.get('/users', getApiAllUser)
    router.get('/users/:id', getApiUserItem)
    router.put('/users/:id', updateApiUser)
    router.delete('/users/:id', deleteApiUser)

    // router.get('/songs', getApiAllSong)
    // router.get('/songs/:id', getApiSongItem)
    // router.put('/songs/:id', updateApiSong)
    // router.delete('/songs/:id', deleteApiSong)

    router.post('/user/authenticated', checkAuthenticated)
    router.post('/user/register', handleRegister)
    router.post('/user/login', handleLogin)
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