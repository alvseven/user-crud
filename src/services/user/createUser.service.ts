import bcrypt from "bcryptjs";
import { instanceToPlain } from "class-transformer";

import { AppError } from "../../error/appError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

import { IUserRequest } from "../../interfaces/users";

const createUserService = async ({
  name,
  email,
  password,
  contact,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const emailAlreadyExists = await userRepository.findOneBy({ email });

  if (emailAlreadyExists) {
    throw new AppError("Email is already registered", 401);
  }

  const newUser = userRepository.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    contact,
    isAdm,
  });

  await userRepository.save(newUser);

  return instanceToPlain(newUser);
};

export { createUserService };
