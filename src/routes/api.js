import express from 'express'
import { 
    getApiAllUser, getApiUserItem, updateApiUser, deleteApiUser
} from '../controllers/controller.api'
import {
    handleLogin, handleRegister
} from '../controllers/userController'

import {
    getApiAllSong,
getApiSongItem,
updateApiSong,
deleteApiSong
} from '../controllers/songController'

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

    router.post('/users/register', handleRegister)
    router.post('/users/login', handleLogin)

    router.get('/library/music', getApiAllSong)
    router.get('/library/music/:id', getApiSongItem)
    router.put('/library/music', updateApiSong)

    app.use('/api', router)
}

export default initApiRouter