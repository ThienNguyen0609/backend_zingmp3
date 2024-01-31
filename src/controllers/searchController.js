import {
    findSong, findAllSong
} from '../services/searchService'

const findApiSong = async (req, res) => {
    const value = req.body.search
    const data = await findSong(value)
    return res.send(data)
}

const findApiAllSong = async (req, res) => {
    const value = req.body.search
    const data = await findAllSong(value)
    return res.send(data)
}

export {
    findApiSong,
    findApiAllSong
}