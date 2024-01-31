require("dotenv").config();
import jwt from 'jsonwebtoken';

const createJWT = (data) => {
    const payload = data
    const secretKey = process.env.SECRET_KEY

    let token = jwt.sign(payload, secretKey);

    return token
}

const verifyToken = (token) => {
    const secretKey = process.env.SECRET_KEY
    let decoded = null
    try {
        decoded = jwt.verify(token, secretKey);
    } catch(err) {
        console.log(err)
    }
    return decoded
}

const checkPermission = (req, res, next) => {
    const cookies = req.cookies
    if(cookies && cookies.jwt) {
        const token = cookies.jwt
        const decoded = verifyToken(token)
        if(decoded) {
            next()
        }
        else {
            res.status(401).json({
                message: "Not authenticated the user"
            })
        }
    }
    else {
        res.status(401).json({
            message: "Not authenticated the user"
        })
    }
}

export {
    createJWT, verifyToken, checkPermission
}