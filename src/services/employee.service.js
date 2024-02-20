//Importacion de dependencias
import { employeeValidator } from "../helpers/validator.js";
import { NotFoundError, DuplicatedResourceError } from "../errorClasses.js";

//Importar repositorio
import employeeRepository from "../repositories/employee.repository.js";

export const getEmployees = async () => {
  return await employeeRepository.getEmployees();
};

export const getEmployeeById = async (id) => {
  // Buscar empleado en la db
  const [rows] = await employeeRepository.getEmployeeById(id);
  if (rows.length <= 0) throw new NotFoundError("not found", "Employee");

  let employee = rows[0];

  return employee;
};

export const createEmployee = async (params) => {
  //Validar datos
  employeeValidator(params);

  //Validar si no existe
  const employeeExists = await employeeRepository.employeeExists(params);
  if (employeeExists)
    throw new DuplicatedResourceError("already exists", "Employee");

  //Guardar en la base
  const [rows] = await employeeRepository.createEmployee(params);
  return {
    id: rows.insertId,
    name: params.name,
    salary: params.salary,
  };
};

export const updateEmployee = async (id, params) => {
  const employeeUpdated = await employeeRepository.updateEmployee(id, params);

  if (!employeeUpdated) throw new NotFoundError("not found", "Employee");

  const [rows] = await employeeRepository.getEmployeeById(id);

  let employee = rows[0];

  return employee;
};

export const deleteEmployee = async (id) => {
  const employeeDeleted = await employeeRepository.deleteEmployee(id);

  if (!employeeDeleted) throw new NotFoundError("not found", "Employee");

  return employeeDeleted;
};

//Exportar acciones
export default {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};