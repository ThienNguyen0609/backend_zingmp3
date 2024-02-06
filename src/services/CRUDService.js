import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }
        catch(err){
            reject(err)
        }
    })
}

const getAllUsers = () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const users = await db.Users.findAll({
                // offset: 4,
                // limit: 4,
                attributes: {
                    exclude: ["password"]
                },
                raw: true
            })
            // console.log(users)
            resolve(users)
        }
        catch(err) {
            reject(err)
        }
    })
}
const createNewUser = (data) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let message
            const hashPasswordFromBcrypt = await hashUserPassword(data.password)
            const isExist = await checkUsername(data.username)
            if(!isExist) {
                const newUser = {
                    name: data.name,
                    email: data.email,
                    country: data.country,
                    password: hashPasswordFromBcrypt,
                    username: data.username,            
                }
                await db.Users.create(newUser)
                message = "ok"
            }
            else message = "the username has been in system"
            resolve(message)
        } catch (error) {
            reject(error)
        }
    })
}
const checkUsername = (username) => {
    return new Promise(async (resolve, reject)=> {
        try {
            const user = await db.Users.findOne({
                where: {
                    username: username
                }
            })
            if(user) resolve(true)
            resolve(false)
        }
        catch(err) {
            reject(err)
        }
    })
}
const getUserById = (userId) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const user = await db.Users.findByPk(userId, {
                attributes: {
                    exclude: ["password"]
                },
                raw: true
            })
            delete user.password
            console.log("user: ",user)
            resolve(user)
        }
        catch {
            reject(new Error("Can't get user database"))
        }
    })
}

const updateUser = (data) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const userUpdated = {
                name: data.name,
                username: data.username,
                email: data.emailaddress,
                country: data.country,
                gender: data.gender,
                dateofbirthf: data.dateofbirth
            }
            await db.Users.update(userUpdated, {
                where: {
                    id: data.id
                }
            })
            resolve("ok, update complete")
        }
        catch(err) {
            reject(err)
        }
    })
}
const deleteUser = (userId) => {
    return new Promise(async (resolve, reject)=> {
        try {
            await db.Users.destroy({
                where: {
                    id: userId
                }
            })
            resolve("delete complete!")
        }
        catch {
            reject(new Error("Can't delete this user with id"))
        }
    })
}

const getAllSong = () => {
    return new Promise(async (resolve, reject)=> {
        try {
            let data = {}
            const songs = await db.Songs.findAll({
                include: {
                    model: db.SongCategories,
                    attributes: ["category"]
                },
                raw: true,
                order: ['id']
            })
            if(songs) {
                data.errorCode = 1
                data.message = "get songs successfully"
                data.songs = songs
            }
            else {
                data.errorCode = 0
                data.message = "get songs error"
                data.songs = []
            }
            resolve(data)
        }
        catch(err) {
            reject(err)
        }
    })
}
const addNewSong = (data) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let message
            const isExist = await checkSongInSystem(data.name)
            if(!isExist) {
                const newSong = {
                    name: data.name,
                    src: data.audiosrc,
                    actor: data.actor,
                    image: data.imagesrc,
                    SongCategoryId: data.songcategoryId,
                    video: !data.videosrc ? null : data.videosrc
                }
                await db.Songs.create(newSong)
                message = "ok"
            }
            else message = "Song has in system"
            resolve(message)
        }
        catch(err){
            reject(err)
        }
    })
}
const checkSongInSystem = async (name) => {
    try {
        const song = await db.Songs.findOne({
            where: {
                name: name
            }
        })
        if(song) return true
        return false
    }
    catch {
        return false
    }
}

const getSongById = (id) => {
    return new Promise(async (resolve, reject)=> {
        try {
            const song = await db.Songs.findByPk(id, {               
                raw: true
            })
            resolve(song)
        } catch (error) {
            reject(error)
        }
    })
}
const updateSong = (data) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const songUpdated = {
                name: data.name,
                src: data.audiosrc,
                actor: data.actor,
                image: data.imagesrc,
                classify: data.classify
            }
            await db.Songs.update(songUpdated, {
                where: {
                    id: data.id
                }
            })
            resolve("ok, update complete")
        }
        catch(err) {
            reject(err)
        }
    })
}

const getAllArtists = () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const artists = await db.Artists.findAll({
                raw: true
            })
            resolve(artists)
        }
        catch(err) {
            reject(err)
        }
    })
}

const addNewArtists = (artist) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let message
            const check = await db.Artists.findOne({
                where: {
                    name: artist.name,
                    fakeName: artist.fakename
                }
            })
            if(!check) {
                await db.Artists.create({
                    name: artist.name,
                    fakeName: artist.fakename,
                    image: artist.image
                })

                message="Add success!"
            }
            else message="Artist has already exist in system!"
            resolve(message)
        }
        catch(err){
            reject(err)
        }
    })
}

export {
    getAllUsers, getUserById,
    updateUser, deleteUser, createNewUser,
    getAllSong, addNewSong,
    getSongById, updateSong,
    getAllArtists, addNewArtists
}