import responseMessage from "../constant/responseMessage.js";
import httpError from "../util/httpError.js";
import httpResponse from "../util/httpResponse.js";
import imagekit from "../util/imagekit.js";



export default {
    url: async (req, res, next) => {
        try {

            const result =  imagekit.getAuthenticationParameters();
            httpResponse(req, res, 200, responseMessage.SUCCESS, {...result})

        } catch (error) {
            console.error("Error in generating presigned url.", error);
            httpError(next, new Error(responseMessage.SOMETHING_WENT_WRONG), req, 500);
        }
    }
}