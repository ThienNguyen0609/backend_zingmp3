import { Users } from "../models"

const getAllUsersApi = () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const listUsers = await Users.findAll({
                attributes: {
                    exclude: ["password"]
                },
                raw: true
            })
            resolve(listUsers)
        }
        catch {
            reject(new Error("Can't get users database"))
        }
    })
}

export {
    getAllUsersApi
}