import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/user';
import { compareSync, hash, hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('Incorrect email or password ', 401);
    }

    const confirmedPassword = await compareSync(password, user.password);

    if (!confirmedPassword) {
      throw new AppErrors('Incorrect email or password ', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token, };
  }
}

export default CreateSessionService;
