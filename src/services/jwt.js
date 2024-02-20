//Importar dependencias
import jwt from "jwt-simple"
import moment from "moment"

//Clave secreta
export const secret = "CLAVE_SECRETA_DEL_PROYECTO_123"

//Crear funcion para generar tokens
export const createToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //momento de creacion
        exp: moment().add(30, "days").unix() //fecha de expiracion del token
    }

    //Devolver jwt token codificado
    return jwt.encode(payload, secret)
}


