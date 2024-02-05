import { myPlaylist, Playlists, PlaylistSongs, SongCategories, Songs } from "../models"
import { Op } from "sequelize"

const createPlaylist = (request) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}

            const [playlist, created] = await Playlists.findOrCreate({
                where: {
                    [Op.and] : [{namePlaylist: request.namePlaylist}, {userId: request.userId}]
                },
                defaults: {
                    userId: request.userId,
                    namePlaylist: request.namePlaylist
                }
            })
            if(created) {
                data.errorCode = 1
                data.message = "create playlist success"
            }
            else {
                data.errorCode = 0
                data.message = "name playlist has been in your playlist"
            }

            resolve(data)
        }
        catch(err) {
            reject(err)
        }
    })
}

const getPlaylist = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            const playlist = await Playlists.findAll({
                where: {
                    userId: userId
                },
                raw: true
            })

            if(playlist) {
                data.errorCode = 1
                data.message = "get playlist success!"
                data.playlist = playlist
            }
            else {
                data.errorCode = 0
                data.message = "can not get playlist"
                data.playlist = []
            }

            resolve(data)
        }
        catch(err) {
            reject(err)
        }
    })
}

const getPlaylistSong = async (playlistId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            const songs = await Songs.findAll({
                include: [
                    {
                        model: Playlists,
                        attributes: [],
                        where: {
                            [Op.and] : [{id: playlistId}, {userId: userId}]
                        }
                    }, {
                        model: SongCategories,
                        attributes: ["category"]
                    }
                ],
                raw: true,
                order: ["id"]
            })
            if(songs) {
                data.errorCode = 1
                data.message = "Success!"
                data.songs = songs
            }
            else {
                data.errorCode = 0
                data.message = "Error!"
                data.songs = []
            }
            resolve(data)
        }
        catch(err) {
            reject(err)
        }
    })
}

const addSongToPlaylist = (playlistId, songId) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            const check = await PlaylistSongs.findOne({
                where: {
                    [Op.and]: [{PlaylistId: playlistId}, {SongId: songId}]
                }
            })
            if(check){
                data.errorCode = 0;
                data.message = "This song has already exist in this playlist"
            }
            else {
                await PlaylistSongs.create({
                    SongId: songId,
                    PlaylistId: playlistId
                })
                data.errorCode = 1;
                data.message = "Added to your playlist successfully"
            }
            resolve(data)
        }
        catch(err){
            reject(err)
        }
    })
}

const removeSongFromPlaylist = (playlistId, songId) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let data = {}
            const check = await PlaylistSongs.findOne({
                where: {
                    [Op.and]: [{PlaylistId: playlistId}, {SongId: songId}]
                }
            })
            if(check){
                await PlaylistSongs.destroy({
                    where: {
                        [Op.and]: [{PlaylistId: playlistId}, {SongId: songId}]
                    }
                })
                data.errorCode = 1
                data.message = "Removed song from playlist successfully"
            }
            else {
                data.errorCode = 0
                data.message = "This song is not in your playlist"
            }
            resolve(data)
        }
        catch(err){
            reject(err)
        }
    })
}

export {
    createPlaylist, getPlaylist, getPlaylistSong,
    addSongToPlaylist, removeSongFromPlaylist
}