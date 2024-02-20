//Importar dependencias y modulos
import { pool } from "../db.js";

const getEmployees = async () => {
  return await pool.query("SELECT * FROM employee");
};

const getEmployeeById = async (id) => {
  return await pool.query("SELECT * FROM employee WHERE id = ?", [id]);
};

const createEmployee = async (params) => {
  //Guardar en la base
  return await pool.query("INSERT INTO employee (name, salary) VALUES (?,?)", [
    params.name,
    params.salary,
  ]);
};

const updateEmployee = async (id, params) => {
  //Actualizar empleado en la base de datos
  const [result] = await pool.query(
    "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
    [params.name, params.salary, id]
  );

  return result.affectedRows > 0;
};

const deleteEmployee = async (id) => {
  //Actualizar empleado en la base de datos
  const [result] = await pool.query(`DELETE FROM employee WHERE id = ?`, [id]);

  return result.affectedRows > 0;
};

const employeeExists = async (params) => {
  const [result] = await pool.query("SELECT * FROM employee WHERE name = ?", [
    params.name
  ]);

  return result.length > 0;
};

//Exportar acciones
export default {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  employeeExists
};
