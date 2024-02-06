import { Op } from "sequelize"
import db from "../models"

const findSong = async (value) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const songSearched = await db.Songs.findAll({
                where: {
                    name: {
                        [Op.like]: `%${value}%`
                    }
                },
                limit: 5,
                raw: true
            })
            resolve(songSearched)
        }
        catch(err) {
            reject(err)
        }
    })
}

const findAllSong = (value) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const songSearched = await db.Songs.findAll({
                where: {
                    name: {
                        [Op.like]: `%${value}%`
                    }
                },
                include: {
                    model: db.SongCategories,
                    attributes: ["category"]
                },
                raw: true
            })
            resolve(songSearched)
        }
        catch(err) {
            reject(err)
        }
    })
}

export {
    findSong, findAllSong
}