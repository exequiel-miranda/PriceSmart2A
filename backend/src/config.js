import dotenv from "dotenv"

//ejecutamos la libreria dotenv
dotenv.config()

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server: {
        port: process.env.PORT
    },
    JWT:{
        secret: process.env.JWT_SECRET_KEY
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    }
}


