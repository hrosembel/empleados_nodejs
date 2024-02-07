import expressPromiseRouter from "express-promise-router";
import {createEmployees, deleteEmployee, getEmployees,getEmployee, updateEmployee
} from '../controllers/employees.controller.js'

const router = expressPromiseRouter()

router.route('/employees')
    .get(getEmployees)
    .post(createEmployees)

router.route('/employees/:id')
    .get(getEmployee)
    .patch(updateEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)

export default router