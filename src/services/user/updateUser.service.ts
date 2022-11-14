import { AppError } from "../../error/appError";

import { IUserUpdate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { instanceToPlain } from "class-transformer";

const updateUserService = async (
  requesterAccountId: string,
  accountId: string,
  { name, email, contact }: IUserUpdate
) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const accountToUpdate = users.find((user) => user.id === accountId);

  if (!accountToUpdate) {
    throw new AppError("Account not found", 404);
  }
  const requesterAccount = users.find((user) => user.id === requesterAccountId);

  if (!requesterAccount!.isAdm && accountToUpdate.id !== requesterAccount!.id) {
    throw new AppError(
      "You must be an admin to update an account you don't own"
    );
  }

  const updatedUser = await userRepository.update(accountToUpdate.id, {
    name: name || accountToUpdate.name,
    email: email || accountToUpdate.email,
    contact: contact || accountToUpdate.contact,
  });

  return instanceToPlain(updatedUser);
};

export { updateUserService };
