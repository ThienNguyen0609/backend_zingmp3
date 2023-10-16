import axios from "axios";
import { Artists } from "../models";

const clientId = 'bab1ae6d076345aabfa85899f1a2deb8';
const clientSecret = 'a9d237a5aad546f793e4fa68d1ff5beb';

const getSpotifyToken = async () => {
    const options = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        data: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    };

    const result = await axios(options)

    return result.data
}

const getArtistFromSpotifyById = async (artistId, token) => {
    return new Promise(async (resolve, reject)=> {
        try {
            const options = {
                url: `https://api.spotify.com/v1/artists/${artistId}`,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
    
            let message = {}

            const artists = await axios(options)
            message.data = artists.data
            message.errorCode = 0

            resolve(message)
        }
        catch(err) {
            reject(err)
        }
    })
}

const addArtistToDatabase = (artist) => {
    return new Promise(async (resolve, reject)=> {
        try {
            const artistData = {
                name: artist.name,
                spotifyId: artist.id,
                genres: artist.genres[0]
            }

            await Artists.create(artistData)

            resolve("ok")
        }
        catch(err) {
            reject(err)
        }
    })
}

export {
    getSpotifyToken,
    getArtistFromSpotifyById,
    addArtistToDatabase
}