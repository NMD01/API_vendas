import AppErrors from '@shared/errors/AppError';
import User from '../typeorm/entities/user';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { hashSync } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = await UserRepository.findById(id);
    const emailExists = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('User not found!');
    }

    if (email) {
      if (emailExists && emailExists.id != user.id) {
        throw new AppErrors('Email address already used');
      }
      user.email = email;
    }

    user.name = name;
    if (password) {
      user.password = hashSync(password);
    }

    await UserRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
