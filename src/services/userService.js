import { Categories, SongCategories, Songs, Users } from '../models';
import bcrypt from 'bcryptjs';
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

const handleGetUser = async (userId) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            const user = await Users.findByPk(userId, {
                raw: true
            })
            if(user) {
                data.errorCode = 1
                data.message = "Get user success!"
                data.user = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    category: {
                        categoryId: user.categoryId,
                        type: user["Category.category"]
                    },
                    dateofbirth: user.DateOfBirth,
                    gender: user.Gender,
                    country: user.Country
                }
            }
            else {
                data.errorCode = 0
                data.message = "Can't not get user"
                data.user = {}
            }
            resolve(data)
        }
        catch {
            reject(new Error("Can't get users database"))
        }
    })
}

const handleUpdateUser = async (user) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const userUpdated = {
                email: user.email,
                Country: user.country,
                Gender: user.gender,
                DateOfBirth: user.dateofbirth
            }
            await Users.update(userUpdated, {
                where: {
                    id: user.id
                }
            })

            resolve({
                errorCode: 1,
                message: "Update completed!"
            })
        }
        catch(err) {
            reject(err)
        }
    })
}

const handleUserRegister = (data) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {}
            if(data.Password === data.ConfirmPassword) {
                const hashPasswordFromBcrypt = await hashUserPassword(data.Password)
                const isExist = await checkUsername(data.UserName)
                if(isExist) {
                    userData.errorCode = 0
                    userData.message = "Username has already exist"
                }
                else {
                    const newUser = {
                        name: data.Name,
                        username: data.UserName,
                        email: data.Email,
                        password: hashPasswordFromBcrypt
                    }
                    await Users.create(newUser)

                    userData.errorCode = 1
                    userData.message = "Create success! login now"
                }
            }
            else {
                userData.errorCode = 0
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
                        category: {
                            categoryId: user.categoryId,
                            type: user["Category.category"]
                        },
                        dateofbirth: user.DateOfBirth,
                        gender: user.Gender,
                        country: user.Country
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
    handleGetUser,
    handleUpdateUser, 
    handleUserLogin, 
    handleUserRegister, 
    checkUserPermission
}