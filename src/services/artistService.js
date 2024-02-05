import { Op } from "sequelize"
import { Artists, SongCategories, Songs } from "../models"

const getAllArtists = () => {
    return new Promise(async (resolve, reject)=>{
        try{
            const artists = await Artists.findAll();
            resolve(artists)
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
            const checkSong = await Songs.findAll({
                where: {
                    actor: {
                        [Op.like]: `%${artistName}%`
                    }
                },
                include: {
                    model: SongCategories,
                    attributes: ["category"]
                },
                raw: true,
                order: ["id"]
            })
            const checkArtist = await Artists.findOne({
                where: {
                    name: artistName
                },
                raw: true
            })
            if(checkSong && checkArtist) {
                data.artistName = checkArtist.name
                data.artistImage = checkArtist.image
                data.songs = checkSong

                resolve(data)
            }
            else resolve(data)
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