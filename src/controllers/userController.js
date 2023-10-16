import { handleUserLogin, handleUserRegister } from "../services/userService"

const handleLogin = async (req, res) => {
    const userName = req.body.username
    const password = req.body.password

    if(!userName || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: "Missing input parameters"
        })
    }
    const message = await handleUserLogin(userName, password)
    if(message.errorCode === 0) return res.status(200).json(message)
    else return res.json(message)
}

const handleRegister = async (req, res) => {
    const message = await handleUserRegister(req.body)
    if(message.errorCode === 0) return res.status(200).json(message)
    else return res.status(500).json(message)
}

export {
    handleLogin, handleRegister
}