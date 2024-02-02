require('dotenv').config()
import { Categories, SongCategories, Songs, Users } from '../models';
import bcrypt from 'bcryptjs';
import { createJWT } from '../middleware/JWTAction';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer'

const secretKey = "Za0wRnhF4aL538R5nmK9HMBB83P1i9Ty";
const salt = bcrypt.genSaltSync(10);

const createOTP = () => {
    const OTPRandom = Math.floor(Math.random() * 8999) + 1000
    return OTPRandom.toString();
}

const sendMail = async (email, OTP) => {
    return new Promise(async (resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MY_MAIL,
              pass: process.env.MY_MAIL_PASSWORD
            }
        });
    
        var mailOptions = {
            from: process.env.MY_MAIL,
            to: "20521950@gm.uit.edu.vn",
            subject: 'Sending Email using Node.js',
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Your Brand Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
                </div>
            </div>
            </div>
            `
        };
    
        try {
            const info = await transporter.sendMail(mailOptions);
            resolve({
                errorCode: 1,
                message: "Change password success! Login now"
            })
        }
        catch(err) {
            reject({
                errorCode: 0,
                message: "Something wrong, try again!"
            })
        }
    })
}

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

const changeUserPassword = (password, usernameOrEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            const user = await Users.findOne({
                where: {
                    [Op.or]: [{email: usernameOrEmail}, {username: usernameOrEmail}]
                },
                raw: true
            })

            if(user) {
                const hashPasswordFromBcrypt = await hashUserPassword(password)
                await Users.update({password: hashPasswordFromBcrypt}, {
                    where: {
                        id: user.id
                    }
                })
                data.errorCode = 1
                data.message = "Change password success, Login now!"
            }
            else {
                data.errorCode = 0
                data.message = "something wrong, try again"
            }
            resolve(data)
        }
        catch(err) {
            reject(err)
        }
    })
}

const handleCheckUserByUsernameOrEmail = (usernameOrEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Users.findOne({
                attributes: ["email"],
                where: {
                    [Op.or]: [{email: usernameOrEmail}, {username: usernameOrEmail}]
                },
                raw: true
            })

            if(user) resolve({
                errorCode: 1,
                message: "username or email has in system",
                email: user.email
            })
            else resolve({
                errorCode: 0,
                message: "username or email has not in system"
            })
        }
        catch(err) {
            reject(err)
        }
    })
}

const handleGetUser = async (userId) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            const user = await Users.findByPk(userId, {
                raw: true,
                include: {
                    model: Categories,
                    attributes: ["category"]
                }
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

const handleUpdateUser = async (userRequest) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let data = {}
            const userUpdated = {
                email: userRequest.email,
                Country: userRequest.country,
                Gender: userRequest.gender,
                DateOfBirth: userRequest.dateofbirth
            }
            await Users.update(userUpdated, {
                where: {
                    id: userRequest.id
                }
            })

            const user = await Users.findByPk(userRequest.id, {
                raw: true,
                include: {
                    model: Categories,
                    attributes: ["category"]
                }
            })

            if(user) {
                data.errorCode = 1
                data.message = "Update completed!"
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
                data.errorCode = 1
                data.message = "Update completed! but not get new user data"
                data.user = {}
            }

            resolve(data)
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
                        username: user.username
                        // email: user.email,
                        // role: user.role,
                        // category: {
                        //     categoryId: user.categoryId,
                        //     type: user["Category.category"]
                        // },
                        // dateofbirth: user.DateOfBirth,
                        // gender: user.Gender,
                        // country: user.Country
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
    createOTP,
    sendMail,
    handleGetUser,
    handleUpdateUser, 
    handleUserLogin, 
    handleUserRegister, 
    checkUserPermission,
    changeUserPassword,
    handleCheckUserByUsernameOrEmail
}