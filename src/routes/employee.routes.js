import expressPromiseRouter from "express-promise-router";
import auth from "../middlewares/auth.js";
import { tryCatch } from "../utils/tryCatch.js";

//Importar employee controller
import employeeController from "../controllers/employee.controller.js";

const router = expressPromiseRouter();

router
  .route("/employees")
  .get(auth(["role_admin"]), tryCatch(employeeController.getEmployees))
  .post(auth(["role_admin"]), tryCatch(employeeController.createEmployee));

router
  .route("/employees/:id")
  .get(auth(["role_admin","role_user"]), tryCatch(employeeController.getEmployeeById))
  .patch(auth(["role_admin"]), tryCatch(employeeController.updateEmployee))
  .put(auth(["role_admin"]), tryCatch(employeeController.updateEmployee))
  .delete(auth(["role_admin"]), tryCatch(employeeController.deleteEmployee));

export default router;
