import AppErrors from '@shared/errors/AppError';
import User from '../typeorm/entities/user';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new AppErrors('user not found!');
    }

    const emailExists = await UserRepository.findByEmail(email);

    if (emailExists && email != user.email) {
      throw new AppErrors('Email address already used');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await UserRepository.save(user)

    return user;
  }
}

export default UpdateUserService;