import bcrypt from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //token

import customerModel from "../models/customers.js";

import { config } from "../config.js";

//array de funciones
const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
  try {
    //#1- Solicitar el correo y la contraseña
    const { email, password } = req.body;

    //verificar si el correo existe en la bd
    const userFound = await customerModel.findOne({ email });

    //Si no lo encuentra
    if (!userFound) {
      return res.status(404).json({ message: "Customer not found" });
    }

    //Verificar si la cuenta está bloqueada
    if (userFound.timeOut && userFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Cuenta bloqueada" });
    }

    //Verificar la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      //Si se equivoca en la contraseña
      //Vamos a sumarle 1 a los intentos fallidos
      userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

      //Bloquear la cuenta despues de 5 intentos fallidos
      if (userFound.loginAttempts >= 5) {
        userFound.timeOut = Date.now() + 15 * 60 * 1000;
        userFound.loginAttempts = 0;

        await userFound.save();
        return res.status(403).json({ message: "Cuenta bloqueada" });
      }

      await userFound.save();

      return res.status(403).json({ message: "Contraseña incorrecta" });
    }

    userFound.loginAttempts = 0;
    userFound.timeOut = null;
    await userFound.save();

    //Generar el token
    const token = jsonwebtoken.sign(
      //#1- ¿que vamos a guardar?
      { id: userFound._id, userType: "customer" },
      //#2- Secret key
      config.JWT.secret,
      //#3- Tiempo de expiración
      { expiresIn: "30d" },
    );

    //Guardamos el token en una cookie
    res.cookie("authCookie", token);

    //Listo!
    return res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginCustomerController;
