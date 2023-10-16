import { Songs } from "../models"
import {getUserById, updateUser, deleteUser 
} from "../services/CRUDService"

import {
    getAllUsersApi
} from '../services/apiService'

const getApiAllUser = async (req, res) => {
    const Users = await getAllUsersApi()
    return res.status(200).json(Users)
}
const getApiUserItem = async (req, res) => {
    const user = await getUserById(req.params.id)
    return res.status(200).json(user)
}

const updateApiUser = async (req, res) => {
    const message = await updateUser(req.body)
    return res.send({
        message: message
    })
}
const deleteApiUser = async (req, res) => {
    const message = await deleteUser(req.params.id)
    return res.send({
        message: message
    })
}

// const getAllSong = async (req, res) => {
//     const listSongs = await Songs.findAll()
//     return res.status(200).send(listSongs)
// }

// const getSongById = async (req, res) => {
//     const songItem = await Songs.findByPk(req.params.id)
//     return res.status(200).send(songItem)
// }

// const addSong = async (req, res) => {
//     const newSong = {
//         name: req.body.name,
//         src: req.body.src,
//         actor: req.body.actor,
//         image: req.body.image
//     }

//     await Songs.create(newSong)

//     return res.send({
//         message: "User was created successfully.",
//     })
// }

export {
    getApiAllUser, getApiUserItem, updateApiUser, deleteApiUser
}