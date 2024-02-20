//Importar dependencias y modulos
import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const getUsers = async () => {
  return await pool.query("SELECT * FROM usertbl");
};

export const getUserById = async (id) => {
  return await pool.query("SELECT * FROM usertbl WHERE id = ?", [id]);
};

export const createUser = async (params) => {
  //Cifrar la contrasenia
  let hash = await bcrypt.hash(params.password.trim(), 10);

  //Guardar usuario en la base de datos
  return await pool.query(
    "INSERT INTO usertbl (name, surname, nick, email, password) VALUES (?,?,?,?,?)",
    [params.name, params.surname, params.nick.trim(), params.email.trim(), hash]
  );
};

export const updateUser = async (id, params) => {
  //Cifrar la contrasenia
  let hash = params.password
    ? await bcrypt.hash(params.password.trim(), 10)
    : null;

  //Eliminar espacios en blanco
  let nick = params.nick ? params.nick.trim() : null;
  let email = params.email ? params.email.trim() : null;
  let role = params.role ? params.role.trim() : null;

  //Actualizar usuario en la base de datos
  const [result] = await pool.query(
    `UPDATE usertbl SET name = IFNULL(?, name),
      surname = IFNULL(?, surname),
      nick = IFNULL(?, nick),
      email = IFNULL(?, email),
      password = IFNULL(?, password),
      role = IFNULL(?, role),
      image = IFNULL(?, image) WHERE id = ?`,
    [params.name, params.surname, nick, email, hash, role, params.image, id]
  );

  return result.affectedRows > 0;
};

export const deleteUser = async (id) => {
  //Actualizar usuario en la base de datos
  const [result] = await pool.query(`DELETE FROM usertbl WHERE id = ?`, [id]);

  return result.affectedRows > 0;
};

export const userExists = async (params) => {
  const [result] = await pool.query(
    "SELECT * FROM usertbl WHERE email = ? OR nick = ?",
    [params.email.trim(), params.nick.trim()]
  );

  return result.length > 0;
};

export const getUserByUsernameOrEmail = async (params) => {
  if (params.email) {
    return await pool.query("SELECT * FROM usertbl WHERE email = ?", [
      params.email.trim(),
    ]);
  }

  if (params.nick) {
    return await pool.query("SELECT * FROM usertbl WHERE nick = ?", [
      params.nick.trim(),
    ]);
  }
  return null;
};

//Exportar acciones
export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  userExists,
  getUserByUsernameOrEmail,
};
