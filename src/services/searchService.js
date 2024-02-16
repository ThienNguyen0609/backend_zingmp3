import { Op } from "sequelize"
import db, { sequelize } from "../models"

const findSong = async (search) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const songSearched = await db.Songs.findAll({
                // where: {
                //     name: {
                //         [Op.like]: `%${value}%`
                //     }
                // },
                where: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), {[Op.like]: `%${search}%`}),
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

const findAllSong = (search) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const songSearched = await db.Songs.findAll({
                where: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), {[Op.like]: `%${search}%`}),
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