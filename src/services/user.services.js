//Importacion de dependencias
import { loginValidator, userValidator } from "../helpers/validator.js";
import bcrypt from "bcrypt";
import {
  ValidationError,
  DuplicatedResourceError,
  NotFoundError,
} from "../errorClasses.js";

//Importar repositorio
import userRepository from "../repositories/user.repository.js";

export const getUsers = async () => {
  return await userRepository.getUsers();
};

export const getUserById = async (id) => {
  // Buscar usuario en la db
  const [rows] = await userRepository.getUserById(id);
  if (rows.length <= 0) throw new NotFoundError("not found", "User");

  let user = rows[0];

  return user;
};

export const createUser = async (params) => {
  //Validar datos
  userValidator(params);

  //Validar si no existe
  const userExists = await userRepository.userExists(params);
  if (userExists)
    throw new DuplicatedResourceError("already exists", "User");

  //Guardar en la base
  const [rows] = await userRepository.createUser(params);
  return {
    id: rows.insertId,
    name: params.name,
    surname: params.surname,
    nick: params.nick.trim(),
    email: params.email.trim(),
  };
};

export const updateUser = async (id, params) => {
  const userUpdated = await userRepository.updateUser(id, params);

  if (!userUpdated) throw new NotFoundError("not found", "User");

  const [rows] = await userRepository.getUserById(id);

  let user = rows[0];

  return user;
};

export const deleteUser = async (id) => {
  const userDeleted = await userRepository.deleteUser(id);

  if (!userDeleted) throw new NotFoundError("not found", "User");

  return "User deleted successfully";
};

export const loginUser = async (params) => {
  //Validacion de parametros
  loginValidator(params);

  // Buscar usuario en la db
  const [rows] = await userRepository.getUserByUsernameOrEmail(params);
  if (rows.length <= 0) throw new NotFoundError("not found", "User");
  let user = rows[0];

  // Comprobar password
  const isValidPassword = await bcrypt.compare(params.password.trim(), user.password);
  if (!isValidPassword) throw new ValidationError("is wrong", "password");

  //Devolver datos de usuario
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
  };
};

//Exportar acciones
export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};