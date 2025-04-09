import config from "../config/config.js"
import responseMessage from "../constant/responseMessage.js"
import httpError from "../util/httpError.js"
import quicker from "../util/quicker.js"

export default async (req, _res, next) => {
    try {
        let accessToken

        if (!accessToken) {
            const authHeader = req.headers.authorization
            if (authHeader?.startsWith('Bearer ')) {
                accessToken = authHeader.substring(7)
            }
        }

        if (!accessToken) {
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 401)
        }

        const { userId } = quicker.verifyToken(accessToken, config.ACCESS_TOKEN.SECRET)

        if(!userId) {
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 401)

        }
        const user = {
            userId
        }
        
        req.user = user
        return next()

    } catch (err) {
        httpError(next, err, req, 500)
    }
}