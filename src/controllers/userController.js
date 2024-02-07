import { verifyToken } from "../middleware/JWTAction"
import { 
    checkUserPermission, 
    handleGetUser, 
    handleCheckUserByUsernameOrEmail, 
    handleUpdateUser, 
    handleUserLogin, 
    handleUserRegister, 
    sendMail,
    createOTP,
    changeUserPassword
} from "../services/userService"

const handleChangePassword = async (req, res) => {
    const {password, usernameOrEmail} = req.body
    const response = await changeUserPassword(password, usernameOrEmail)
    if(response.errorCode) return res.status(200).json(response)
    return res.status(500).json(response)
}

const handleCheckUserPermission = async (req, res) => {
    const {songId, userId} = req.body

    const data = await checkUserPermission(songId, userId)
    console.log(data)
    return res.status(200).json(data)
}

const handleCheckUser = async (req, res, next) => {
    console.log(req.body.usernameOrEmail)
    const {usernameOrEmail} = req.body
    const response = await handleCheckUserByUsernameOrEmail(usernameOrEmail)
    if(response.errorCode) {
        req.body.email = response.email
        return next()
    }
    return res.status(200).json(response)
}

const handleSendEmail = async (req, res) => {
    const {email} = req.body
    const OTP = createOTP()
    const response = await sendMail(email, OTP)
    if(response.errorCode) {
        return res.status(200).send({
            OTP: OTP,
            response: response
        })
    }
    return res.status(500).send(response)
}

const handleVerifyOTP = (req, res) => {
    const {OTP, OTPSend} = req.body
    let data = {}
    if(OTP === OTPSend) {
        data.errorCode = 1
        data.message = "success!"
    }
    else {
        data.errorCode = 0
        data.message = "Wrong OTP, try again"
    }
    return res.status(200).json(data)
}

const checkAuthority = (req, res, next) => {
    const cookies = req.cookies
    const userId = req.body.userId
    console.log(cookies)
    if(cookies && cookies[`jwt${userId}`]) {
        const token = cookies[`jwt${userId}`]
        const decoded = verifyToken(token)
        console.log(decoded)
        if(decoded) {
            return next()
        }
        else {
            return res.status(401).json({
                errorCode: 0,
                message: "Invalid Token, please login!"
            })
        }
    }
    return res.status(401).json({
        errorCode: 0,
        message: "Please login before use us service"
    })
}

const checkAuthenticated = (req, res) => {
    const cookies = req.cookies
    const userId = req.body.userId
    console.log(cookies[`jwt${userId}`])
    if(cookies && cookies[`jwt${userId}`]) {
        const token = cookies[`jwt${userId}`]
        const decoded = verifyToken(token)

        if(decoded) {
            console.log("Auth success")
            return res.status(200).json({
                errorCode: 1,
                message: "Login success!"
            })
        }
        else {
            console.log("Auth error")
            res.status(401).json({
                errorCode: 0,
                message: "Invalid Token, please login!"
            })
        }
    }
    console.log("not have cookies")
    return res.status(401).json({
        errorCode: 0,
        message: "Please login before use us service"
    })
}

const handleLogin = async (req, res) => {
    const userName = req.body.username
    const password = req.body.password

    if(!userName || !password) {
        return res.status(200).json({
            errorCode: 0,
            message: "please fill out full fields"
        })
    }
    const data = await handleUserLogin(userName, password)

    console.log(data)

    if(data.errorCode) res.cookie(`jwt${data.data.id}`, data.accessToken, {sameSite : "none",
    secure: true,
    domain: "https://frontend-zingmp3.vercel.app",
    httpOnly: true});
    return res.status(200).json(data)
}

const handleRegister = async (req, res) => {
    const message = await handleUserRegister(req.body)
    if(message.errorCode) return res.status(200).json(message)
    else return res.status(500).json(message)
}

const handleLogout = (req, res) => {
    try{
        res.clearCookie(`jwt${req.body.userId}`);
        return res.status(200).json({
            errorCode: 0,
            message: "Logout success!"
        })
    }
    catch {
        return res.status(500).json({
            errorCode: 0,
            message: "Error from server!"
        })
    }
}

const handleGet = async (req, res) => {
    const response = await handleGetUser(req.params.id)
    console.log(response)
    if(response.errorCode) return res.status(200).json(response)
    return res.status(500).json(response)
}

const handleUpdate = async (req, res) => {
    console.log(req.body)
    const response = await handleUpdateUser(req.body.user)
    return res.status(200).json(response)
}

export {
    handleGet,
    handleCheckUser,
    handleUpdate,
    handleLogin, 
    handleLogout,
    handleRegister, 
    checkAuthority, 
    checkAuthenticated, 
    handleCheckUserPermission,
    handleSendEmail,
    handleChangePassword,
    handleVerifyOTP
}