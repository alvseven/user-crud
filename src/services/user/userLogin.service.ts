import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AppDataSource from "../../data-source";
import { AppError } from "../../error/appError";
import { User } from "../../entities/user.entity";

import { IUserLogin } from "../../interfaces/users";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Account not found", 404);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError("Incorrect email or password", 403);
  }

  const token = jwt.sign(
    { id: user.id, isAdm: user.isAdm },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export { userLoginService };
