import { Prisma } from '@prisma/client';
import errorObject from './errorObject.js';

export default (nextFunc, err, req, errorStatusCode = 500) => {
    console.log(errorStatusCode, "s");
    
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            
            case "P2002":
                return nextFunc(errorObject(new Error("User already exist."), req, 409));

            case "P2025":
                return nextFunc(errorObject(new Error("User not found."), req, 404));

            case "P2003":
                return nextFunc(errorObject(new Error("Invalid reference to another record."), req, 400));

            default:
                return nextFunc(errorObject(new Error("Database error. Please try again later."), req, 500));
        }
    }
    
    return nextFunc(errorObject(err, req, errorStatusCode));
};
