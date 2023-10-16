import express from 'express'
import { 
    getHomePage, getLibraryMusic, 
    getCreateUserPage, postCreateUser, 
    getUpdateUserPage, postUpdateUser,
    getCreateSongPage, postCreateSong, 
    getUpdateSongPage, postUpdateSong,
    getArtistPage
} from '../controllers/CRUDControler'
const router = express.Router()

const initWebRouter = (app) => {
    router.get('/', getHomePage)
    router.get('/library/music', getLibraryMusic)
    router.get('/artists', getArtistPage)

    router.get('/library/music/create', getCreateSongPage)
    router.post('/library/music/create', postCreateSong)

    router.get('/library/music/update/:id', getUpdateSongPage)
    router.post('/library/music/update', postUpdateSong)

    router.get('/users/create', getCreateUserPage)
    router.post('/users/create', postCreateUser)

    router.get('/users/update/:id', getUpdateUserPage)
    router.post('/users/update', postUpdateUser)

    return app.use('/', router)
}

export default initWebRouter