import { prisma } from "../config/prisma.js"
import responseMessage from "../constant/responseMessage.js";
import httpError from "../util/httpError.js";
import httpResponse from "../util/httpResponse.js";

export default {
    createCompanyDetails: async (req, res, next) => {

        try {

            const {
                name,
                position,
                companyName,
                companyOfficialNumber,
                companyEmail,
                companyWebsiteUrl,
                companyAddress,
                companyPan,
                companyLogoUrl,  
                incorporationCertificateUrl,
                moaDocumentUrl,          
                authorizedSignatorySealUrl,    
                companyRoundSealUrl,           
                fssaiCertificateUrl
            } = req.body;

            const authUser = req.user;

            const user = await prisma.client.findFirst({
                where: {
                    id: authUser.userId
                }
            });

            if(!user) {
                return httpError(next, new Error("User not found."), req, 404);
            };

            await prisma.clientCompanyDetails.create({
                data: {
                    clientId: authUser.userId,
                    name,
                    position,
                    companyName,
                    companyOfficialNumber,
                    companyEmail,
                    companyWebsiteUrl,
                    companyAddress,
                    companyPan,
                    companyLogoUrl,  
                    incorporationCertificateUrl,
                    moaDocumentUrl,          
                    authorizedSignatorySealUrl,    
                    companyRoundSealUrl,           
                    fssaiCertificateUrl
                }
            })
            
            return httpResponse(req, res, 200, responseMessage.SUCCESS, null)

        } catch (error) {
            console.error("Error in creating company details.", error);
            return httpError(next, error, req, 500);
        }
    },
    createDirectorDetails: async (req, res, next) => {
        
        try {
            
            const {                
                companyId,          
                name,               
                phoneNumber,        
                pan,                
                email,              
                panCardUrl,           
                idProofUrl,            
                signatureUrl         
            } = req.body;

            const authUser = req.user;

            const user = await prisma.client.findFirst({
                where: {
                    id: authUser.userId
                },
                select: {
                    clientCompanyDetails: true
                }
            });
            
            if(!user) {
                return httpError(next, new Error("User not found."), req, 404);
            };
            if(!user.clientCompanyDetails) return httpError(next, new Error("First fill the company details."), req, 400);

            await prisma.clientCompanyDirector.create({
                data: {                 
                    companyId: user.clientCompanyDetails.id,          
                    name,               
                    phoneNumber,        
                    pan,                
                    email,              
                    panCardUrl,           
                    idProofUrl,            
                    signatureUrl
                }
            })

            return httpResponse(req, res, 200, responseMessage.SUCCESS, null);

        } catch (error) {
            console.error("Error in creating director details.", error);
            return httpError(next, error, req, 500);
        }
    },
    signAgreement: async (req, res, next) => {
        try {

            const authUser = req.user;

            const user = await prisma.client.findFirst({
                where: {
                    id: authUser.userId
                },
                select: {
                    clientCompanyDetails: {
                        include: {
                            director: true
                        }
                    }
                }
            });

            console.log(user);
            

            if(!user) {
                return httpError(next, new Error("User not found."), req, 404);
            };

            if(!user.clientCompanyDetails) {
                return httpError(next, new Error("First fill the company details."), req, 404);
            }

            if(!user.clientCompanyDetails.director) {
                return httpError(next, new Error("First fill the company director details."), req, 404);
            }

            await prisma.client.update({
                where: {
                    id: authUser.userId
                },
                data: {
                    ndaSign: true,
                    logoAgreement: true
                }
            });

            httpResponse(req, res, 200, responseMessage.SUCCESS, null);

        } catch (error) {
            console.error("Error in signing agreement.", error);
            return httpError(next, error, req, 500);
        }
    }
}