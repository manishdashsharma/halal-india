import httpError from "../util/httpError.js";


export const validateRequest = (schema) => {
    return async (req, res, next) => {
        console.log(req.body, "body");
        
        try {
            const result = schema.safeParse(req.body);
            
            if(!result.success) {
                
                const formattedErrors = Object.entries(result.error.format())
                .filter(([key]) => key !== "_errors")
                .map(([field, error]) => ({
                    field,
                    message: Array.isArray(error) ? error.join(", ") : (error)._errors?.join(", ") || "Invalid input"
                }));
                
                console.log(formattedErrors);
                
                return httpError(next, new Error(`${formattedErrors[0].message}` || "Fields required."), req, 400)
            }
            req.body = result.data;
            next();
            
        } catch (error) {
            console.error("Error in validating request", error);
            httpError(next, new Error("Internal Server Error."), req, 500);
            
        }
    }
}