import { verifyToken } from "../middleware/JWTAction"
import { checkUserPermission, handleUserLogin, handleUserRegister } from "../services/userService"

const handleCheckUserPermission = async (req, res) => {
    const songId = req.body.songId
    const userId = req.body.userId

    const data = await checkUserPermission(songId, userId)
    console.log(data)
    return res.status(200).json(data)
}

const checkAuthority = (req, res, next) => {
    const cookies = req.cookies
    const userId = req.body.userId

    if(cookies && cookies[`jwt${userId}`]) {
        const token = cookies[`jwt${userId}`]
        const decoded = verifyToken(token)

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

    if(cookies && cookies[`jwt${userId}`]) {
        const token = cookies[`jwt${userId}`]
        const decoded = verifyToken(token)

        if(decoded) {
            return res.status(200).json({
                errorCode: 1,
                message: "Login success!"
            })
        }
        else res.status(401).json({
            errorCode: 0,
            message: "Invalid Token, please login!"
        })
    }
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
    res.cookie(`jwt${data.data.id}`, data.accessToken, {httpOnly: true});
    return res.status(200).json(data)
}

const handleRegister = async (req, res) => {
    const message = await handleUserRegister(req.body)
    if(message.errorCode === 0) return res.status(200).json(message)
    else return res.status(500).json(message)
}

export {
    handleLogin, handleRegister, checkAuthority, checkAuthenticated, handleCheckUserPermission
}