//Importar modulos
import jwt from "jwt-simple";
import moment from "moment";

//Importar clave secreta
import { secret } from "../services/jwt.js";

//Middleware de autenticacion
const auth = (authorized_roles) => (req, res, next) => {
  //Comprobar si llega la cabecera de autenticacion
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "Request has not authentication header",
    });
  }

  //Limpiar token
  let token = req.headers.authorization.replace(/['"]+/g, "");

  //Decodificar token
  try {
    let payload = jwt.decode(token, secret);

    //Comprobar expiracion del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "Token has expired",
      });
    }
    //Agregar datos de usuario a request
    req.user = payload;

    //Obtener rol del usuario actual
    const userRole = req.user.role;

    //Verificar si el rol esta autorizado
    if (!authorized_roles.includes(userRole)) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized access to the requested resource",
      });
    }
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "Invalid token",
    });
  }

  //Pasar a ejecucion de accion
  next();
};

export default auth;
