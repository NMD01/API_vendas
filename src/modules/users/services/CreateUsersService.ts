import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/user';

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

    const User = UserRepository.create({
      name,
      email,
      password,
    });
    await UserRepository.save(User);

    return User;
  }
}

export default CreateUserService;
