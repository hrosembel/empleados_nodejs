import expressPromiseRouter from "express-promise-router";
import auth from "../middlewares/auth.js";
import { tryCatch } from "../utils/tryCatch.js";

//Importar employee controller
import userController from "../controllers/user.controller.js";

const router = expressPromiseRouter();

router.get("/test-user", auth, tryCatch(userController.test_user));

router
  .route("/user")
  .get(auth(["role_superadmin"]), tryCatch(userController.getUsers))
  .post(auth(["role_superadmin"]), tryCatch(userController.createUser));

router
  .route("/user/:id")
  .get(auth(["role_superadmin"]), tryCatch(userController.getUserById))
  .patch(auth(["role_superadmin"]), tryCatch(userController.updateUser))
  .put(auth(["role_superadmin"]), tryCatch(userController.updateUser))
  .delete(auth(["role_superadmin"]), tryCatch(userController.deleteUser));

router.post("/login", tryCatch(userController.loginUser));

export default router;
