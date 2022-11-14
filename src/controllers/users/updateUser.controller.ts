import { Request, Response } from "express";

import { updateUserService } from "../../services/user/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const requesterAccountId = req.user.id;

  const updatedUser = await updateUserService(requesterAccountId, id, req.body);

  return res.status(200).json(updatedUser);
};

export { updateUserController };
