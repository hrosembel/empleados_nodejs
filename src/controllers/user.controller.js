import { createToken } from "../services/jwt.js";

//Importar user service
import userService from "../services/user.services.js";

export const test_user = async (req, res) => {
  return res.status(200).send({
    message: "Message from user controller",
    user: req.user,
  });
};

export const getUsers = async (req, res) => {
  //Obtener todos los usuarios
  const [result] = await userService.getUsers();

  //Respuesta
  return res.status(200).json({
    result,
  });
};

export const getUserById = async (req, res) => {
  //Recoger id
  const { id } = req.params;

  //Obtener usuario
  const result = await userService.getUserById(id);

  //Respuesta
  return res.status(200).json({
    user: result,
  });
};

export const createUser = async (req, res) => {
  //Recoger parametros
  let params = req.body;

  //Registro de usuario
  const result = await userService.createUser(params);

  //Respuesta
  return res.status(200).json({
    user: result,
  });
};

export const updateUser = async (req, res) => {
  //Recoger parametros
  const { id } = req.params;
  const params = req.body;
  //Obtener usuario
  const result = await userService.updateUser(id, params);

  //Respuesta
  return res.status(200).json({
    user: result,
  });
};

export const deleteUser = async (req, res) => {
  //Recoger id
  const { id } = req.params;

  //Proteccion de el propio usuario
  if (req.user.id == id) {
    return res.status(401).send({
      status: "error",
      message: "You are not authorized to delete your own user",
    });
  }

  //eliminar usuario
  const message = await userService.deleteUser(id);

  //Devolver respuesta
  return res.status(204).send(message);
};

export const loginUser = async (req, res) => {
  //Recoger parametros body
  let params = req.body;

  //Login de usuario
  const user = await userService.loginUser(params);

  //Conseguir token
  const token = createToken(user);

  //Respuesta
  return res.status(200).json({
    user,
    token,
  });
};

//Exportar acciones
export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
