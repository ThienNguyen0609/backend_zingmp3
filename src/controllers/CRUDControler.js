import { Songs } from "../models"
import {
    createNewUser, updateUser, 
    getAllUsers, getUserById,
    getAllSong, addNewSong,
    getSongById, updateSong,
    getAllArtists
} from "../services/CRUDService"

const getHomePage = async (req, res) => {
    const Users = await getAllUsers()
    return res.render('home.ejs', {Users: Users})
}

const getCreateUserPage = (req, res) => {
    return res.render('createUser.ejs')
}
const postCreateUser = async (req, res) => {
    const message = await createNewUser(req.body)
    console.log(message)
    return res.redirect('/')
}

const getUpdateUserPage = async (req, res) => {
    const user = await getUserById(req.params.id)
    return res.render('updateUser.ejs', {user: user})
}
const postUpdateUser = async (req, res) => {
    const message = await updateUser(req.body)
    console.log(message)
    return res.redirect('/')
}



// library music
const getLibraryMusic = async (req, res) => {
    const Songs = await getAllSong()
    return res.render('libraryMusic.ejs', {listSongs: Songs})
}

const getCreateSongPage = (req, res) => {
    return res.render("addSong.ejs")
}
const postCreateSong = async (req, res) => {
    const message = await addNewSong(req.body)
    return res.redirect('/library/music')
}
const getUpdateSongPage = async (req, res) => {
    const song = await getSongById(req.params.id)
    // console.log(song)
    return res.render("updateSong.ejs", {song: song})
}
const postUpdateSong = async (req, res) => {
    const message = await updateSong(req.body)
    return res.redirect("/library/music")
}

// get Artists

const getArtistPage = async (req, res) => {
    const artists = await getAllArtists()
    return res.render("artists.ejs", {artists: artists})
}

export {
    getHomePage, getLibraryMusic, 
    getCreateUserPage, postCreateUser,
    getUpdateUserPage, postUpdateUser,
    getCreateSongPage, postCreateSong, 
    getUpdateSongPage, postUpdateSong,
    getArtistPage
}