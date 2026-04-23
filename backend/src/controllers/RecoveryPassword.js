import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken" //Generar Tokens
import bcrypt from "bcryptjs" //Encriptar la nueva Contraseña
import crypto from "crypto"  //Generar codigos aleatorios
import nodemailer from "nodemailer" //Enviar correos
import HTMLrecoveryEmail from "../Utils/sendMailrecoveryPassword.js"

import {config} from "../config.js"
import customerModel from "../models/customers.js"
import { transcode } from "buffer"
import { error } from "console"

//Array de funciones
const recoverypasswordController ={};

recoverypasswordController.requestCode = async (req,res) => {
    try {
        //Solicitamos los datos
        const {email} = req.body;

        //Validar que el Correo si este en la base de datos
        const userfound = await customerModel.findOne({email});

        if(!userfound){
            return res.status(404).json({message:"User not found"})
        }

        //Generar el numero Aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        //Guardamos todo en un token 
        const token = jsonwebtoken.sign(
            // #1 datos que vamos a Guardar
            {email,randomCode,userType:"customer", verified: false},
            //#2 Secret Key
            config.JWT.secret,
            //#3-Cuanto expira
            {expiresIn: "15m"}
        );

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        //enviamos por correo electronico 
        //el codigo aleatorio
        //#1¿Quien lo envia?

        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:config.email.user_email,
                password:config.email.user_password
            }
        })

        //#2 Quien lo recibe y Como
        const mailOptions = ({
            from: config.email.user_email,
            to:email,
            subject:"Codigo de Recuperacion de contraseña",
            body: "El Codigo vence en 15 minutos",
            html: HTMLrecoveryEmail(randomCode),
        })

        //#Enviar el Correo
        Transporter.sendMail(mailOptions, (error,info)=> {
            if(error){
                return res.status(500).json({message: "Error al enviar el correo", error})
            }
        });

        return res.status(200).json({message: "email sent"})


    } catch (error) {
        console.log("error"+ error)
        return res.status(500).json({message:"Internal Server Error", error})
    }
};



recoverypasswordController.Verifiedcode = async (req,res) => {
    try {
        //#1 Solicitamos los datos
        const {code} = req.body;
        
        //Obtenemos la informacion que esta adentro del token
        //Accedemos a la Cookie
        const token = req.cokies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Invalid Code"})
        }

        //En cambio, si escribe bien el codigo,
        //vamos a colocar en el token que ya esta verificado
        const newToken = jsonwebtoken.sign(
            //¿Que vamos a guardar?
            {email: decoded.email, userType: "Customer", verified:true},
            //Secret Key
            config.JWT.secret,
            //¿Cuando expira?
            {expiresIn: "15m"},
        )

        res.cookie("recoveryCookie", newToken, {maxAge: 15*60*1000});

        return res.status(200).json({message: "Code verified succesfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}


recoverypasswordController.newPassword = async (req,res) => {
    try {
        //#1 solicito los datos
        const {NewPassword,confirmNewPassword} = req.body;

        //Comparar las contraseñas
        if(NewPassword !== confirmNewPassword){
            return res.status(400).json({message: "Passwords doesn't match"})
        }

        //Si las Contraseñas Coinciden
        //Verificamos que el token yas existe 
        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(!decoded.verified){
            return res.status(400).json({messgae:"code not Verified"})
        }

        //Encriptar la nueva Contraseña
        const passwordHash = await bcrypt.hash(NewPassword,10)

        await customerModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new:true},        
        )

        res.clearCookie("recoveryCookie");

        return res.status(200).json({message:"Password Updated"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal Server Error"})
    }
};
export default recoverypasswordController;