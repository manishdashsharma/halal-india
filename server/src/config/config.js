import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

const config ={
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_TOKEN: {
        SECRET: process.env.ACCESS_TOKEN_SECRET,
        EXPIRY: 3600 * 24 * 7
    },
    IMAGEKIT: {
        PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
        PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
        URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    }    
}

console.log(config);

export default config;
