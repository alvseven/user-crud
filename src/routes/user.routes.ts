import { Router } from "express";

import { createUserController } from "../controllers/users/createUser.controller";
import { listUsersController } from "../controllers/users/listUsers.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { userLoginController } from "../controllers/users/userLogin.controller";

import UserHasAuthorizationMiddleware from "../middlewares/userHasAuthorization.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);

userRoutes.post("/login", userLoginController);

userRoutes.get("", listUsersController);

userRoutes.patch("/:id", UserHasAuthorizationMiddleware, updateUserController);

userRoutes.delete("/:id", UserHasAuthorizationMiddleware, deleteUserController);

export default userRoutes;
