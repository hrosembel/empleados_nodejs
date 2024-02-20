//Importar employee service
import employeeService from "../services/employee.service.js";

export const getEmployees = async (req, res) => {
  //Obtener todos los empleados
  const [result] = await employeeService.getEmployees();

  //Respuesta
  return res.status(200).json({
    result,
  });
};

export const getEmployeeById = async (req, res) => {
  //Recoger id
  const { id } = req.params;

  //Restringir si es usuario sin privilegios que consulta a otro usuario
  if (req.user.role == "role_user" && req.user.id != id) {
    return res.status(401).send({
      status: "error",
      message: "Unauthorized access to the requested resource",
    });
  }

  //Obtener empleado
  const result = await employeeService.getEmployeeById(id);

  //Respuesta
  return res.status(200).json({
    employee: result,
  });
};

export const createEmployee = async (req, res) => {
  //Recoger parametros
  let params = req.body;

  //Registro de empleado
  const result = await employeeService.createEmployee(params);

  //Respuesta
  return res.status(200).json({
    employee: result,
  });
};

export const updateEmployee = async (req, res) => {
  //Recoger parametros
  const { id } = req.params;
  const params = req.body;

  //Obtener empleado
  const result = await employeeService.updateEmployee(id, params);

  //Respuesta
  return res.status(200).json({
    employee: result,
  });
};

export const deleteEmployee = async (req, res) => {
  //Recoger id
  const { id } = req.params;

  //eliminar employee
  await employeeService.deleteEmployee(id);

  //Devolver respuesta
  res.sendStatus(204);
};

//Exportar acciones
export default {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
