import { Request, Response } from "express";

import { createUserService } from "../../services/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, contact, isAdm } = req.body;

  const newUser = await createUserService({
    name,
    email,
    contact,
    password,
    isAdm,
  });

  return res.status(201).json(newUser);
};

export { createUserController };
