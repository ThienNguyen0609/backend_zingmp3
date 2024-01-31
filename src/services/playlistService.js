import { myPlaylist, SongCategories, Songs } from "../models"
import { Op } from "sequelize"

const getMyPlaylistById = (userId) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const songs = await Songs.findAll({
                include: [{
                    model: myPlaylist,
                    attributes: [],
                    where: {
                        userId: userId
                    }
                }, {
                    model: SongCategories,
                    attributes: ["category"]
                }],
                raw: true
            })
            resolve(songs)
        }
        catch(err){
            reject(err);
        }
    })
}

const addSongToPlaylist = (userId, songId) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            const check = await myPlaylist.findOne({
                where: {
                    [Op.and]: [{userId: userId}, {songId: songId}]
                }
            })
            if(check){
                data.errorCode = 0;
                data.message = "This song has already exist in your playlist"
            }
            else {
                await myPlaylist.create({
                    userId: userId,
                    songId: songId
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

const removeSongFromPlaylist = (userId, songId) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let data = {}
            const check = await myPlaylist.findOne({
                where: {
                    [Op.and]: [{userId: userId}, {songId: songId}]
                }
            })
            if(check){
                await myPlaylist.destroy({
                    where: {
                        [Op.and]: [{userId: userId}, {songId: songId}]
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
    getMyPlaylistById, addSongToPlaylist, removeSongFromPlaylist
}