import { Categories, SongCategories, Songs, Users } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createJWT } from '../middleware/JWTAction';

const secretKey = "Za0wRnhF4aL538R5nmK9HMBB83P1i9Ty";
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

const handleUserRegister = (data) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {}
            if(data.password === data.confirmPassword) {
                const hashPasswordFromBcrypt = await hashUserPassword(data.password)
                const isExist = await checkUsername(data.username)
                if(isExist) {
                    userData.status = 400
                    userData.message = "Username has already exist"
                }
                else {
                    const newUser = {
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        city: data.city,
                        password: hashPasswordFromBcrypt
                    }
                    await Users.create(newUser)

                    userData.status = 200
                    userData.message = "Create success!"
                    delete newUser.password
                    userData.data = newUser
                }
            }
            else {
                userData.status = 400
                userData.message = "Your password is not same"
            }
            resolve(userData)
        }
        catch(err) {
            reject(err)
        }
    })
}

const handleUserLogin = (userName, password) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {}
            const isExist = await checkUsername(userName)
            if(isExist) {
                const user = await Users.findOne({
                    where: {
                        username: userName
                    },
                    raw: true,
                    include: {
                        model: Categories,
                        attributes: ["category"]
                    }
                })
                console.log(user)
                const isCorrectPassword = bcrypt.compareSync(password, user.password);
                if(isCorrectPassword) {
                    const token = createJWT({userName: user.username, email: user.email})

                    userData.errorCode = 1
                    userData.message = "Login succeed!"
                    userData.accessToken = token
                    userData.data = {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        category: user["Category.category"]
                    }
                }
                else {
                    userData.errorCode = 0
                    userData.message = "Your username and password is wrong, try again!"
                    
                }
            }
            else {
                userData.errorCode = 0
                userData.message = "Your username and password is wrong, try again!"
            }
            resolve(userData)
        }
        catch(err) {
            reject(err)
        }
    })
}

const checkUsername = (username) => {
    return new Promise(async (resolve, reject)=> {
        try {
            const user = await Users.findOne({
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

const checkUserPermission = (songId, userId) => {
    return new Promise(async (resolve, reject)=>{
        try{
            let data = {}
            const songCatId = await Songs.findByPk(songId, {
                attributes: ["SongCategoryId"],
                raw: true,
                include: {
                    model: SongCategories,
                    attributes: ["category"]
                }
            })
            const userCatId = await Users.findByPk(userId, {
                attributes: ["categoryId"],
                raw: true,
                include: {
                    model: Categories,
                    attributes: ["category"]
                }
            })
            console.log("userCatId:", userCatId.categoryId, "songCatId:", songCatId.SongCategoryId)
            if(userCatId.categoryId >= songCatId.SongCategoryId) {
                data.errorCode = 1
                data.message = "Can play song"
                data.Song = songCatId
                data.User = userCatId
            }
            else {
                data.errorCode = 0
                data.message = "Upgrade your account to play \"PREMIUM\" song"
                data.Song = songCatId
                data.User = userCatId
            }
            resolve(data)
        }
        catch(err){
            reject(err);
        }
    })
}

export {
    handleUserLogin, handleUserRegister, checkUserPermission
}