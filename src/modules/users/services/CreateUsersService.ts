import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/user';
import { hash, hashSync } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const EmailExists = await UserRepository.findByEmail(email);

    if (EmailExists) {
      throw new AppErrors('Email address already used');
    }

    const cryptPassword = await hashSync(password);

    const User = UserRepository.create({
      name,
      email,
      password: cryptPassword,
    });
    await UserRepository.save(User);

    return User;
  }
}

export default CreateUserService;
