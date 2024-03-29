import express from 'express'
import { 
    getHomePage, getLibraryMusic, getArtistPage,
    getCreateUserPage, postCreateUser, 
    getUpdateUserPage, postUpdateUser,
    getCreateSongPage, postCreateSong, 
    getUpdateSongPage, postUpdateSong,
    handleDeleteSong,
    getAddArtistPage, postAddArtist
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
    
    router.delete('/library/music/delete/:songId', handleDeleteSong)

    router.get('/users/create', getCreateUserPage)
    router.post('/users/create', postCreateUser)

    router.get('/user/update/:id', getUpdateUserPage)
    router.post('/user/update', postUpdateUser)

    router.get('/artists/add', getAddArtistPage)
    router.post('/artists/add', postAddArtist)

    return app.use('/', router)
}

export default initWebRouter