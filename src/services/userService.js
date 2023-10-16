import { Users } from '../models';
import bcrypt from 'bcryptjs';
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
                    userData.errorCode = 1
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

                    userData.errorCode = 0
                    userData.message = "Create success!"
                    delete newUser.password
                    userData.data = newUser
                }
            }
            else {
                userData.errorCode = 3
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
                        userName: userName
                    },
                    raw: true
                })
                const isCorrectPassword = bcrypt.compareSync(password, user.password);
                if(isCorrectPassword) {
                    userData.errorCode = 0
                    userData.message = "Login succeed!"
                    delete user.password
                    userData.data = user
                }
                else {
                    userData.errorCode = 3
                    userData.message = "Your username and password is wrong, try again!"
                    
                }
            }
            else {
                userData.errorCode = 2
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

export {
    handleUserLogin, handleUserRegister
}