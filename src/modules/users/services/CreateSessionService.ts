import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/user';
import { compareSync, hash, hashSync } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('Incorrect email or password ', 401);
    }

    const confirmedPassword = await compareSync(password, user.password);

    if (!confirmedPassword) {
      throw new AppErrors('Incorrect email or password ', 401);
    }

    return user;
  }
}

export default CreateSessionService;
