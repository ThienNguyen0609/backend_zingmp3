import db from '../models/index';

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

const getCurrentSong = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            const song = await db.Songs.findOne({
                include: [
                    {
                        model: db.Users,
                        attributes: [],
                        where: {
                            id: userId
                        }
                    },
                    {
                        model: db.SongCategories,
                        attributes: ["category"]
                    }
                ],
                raw: true
            })
            if(song) {
                data.errorCode = 1
                data.message = "get song successfully"
                data.song = song
            }
            else {
                data.errorCode = 0
                data.message = "get song error"
                data.song = {}
            }
            resolve(data)
        }
        catch(err) {
            reject(err)
        }
    })
}

export {
    getAllSong, getCurrentSong
}