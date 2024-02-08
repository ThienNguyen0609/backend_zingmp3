import { Op } from "sequelize"
import db from "../models"

const getAllArtists = () => {
    return new Promise(async (resolve, reject)=>{
        try{
            let data = {}
            const artists = await db.Artists.findAll({
                raw: true
            });
            if(artists) {
                data.errorCode = 1
                data.message = "get artist success"
                data.artists = artists
            }
            else {
                data.errorCode = 0
                data.message = "get artist error"
                data.artists = []
            }
            resolve(data)
        }
        catch(err) {
            reject(err)
        }
    })
}

const getArtistInfo = (artistName) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let data = {}
            const songs = await db.Songs.findAll({
                where: {
                    actor: {
                        [Op.like]: `%${artistName}%`
                    }
                },
                include: {
                    model: db.SongCategories,
                    attributes: ["category"]
                },
                raw: true,
                order: ["id"]
            })
            const artist = await db.Artists.findOne({
                where: {
                    name: artistName
                },
                raw: true
            })
            if(songs && artist) {
                data.errorCode = 1
                data.message = "get success!"
                data.artist = artist
                data.songs = songs
            }
            else {
                data.errorCode = 0
                data.message = "get error!"
                data.artist = []
                data.songs = []
            }
            resolve(data)
        }   
        catch(err) {
            reject(err)
        }
    })
}

export {
    getAllArtists,
    getArtistInfo
}