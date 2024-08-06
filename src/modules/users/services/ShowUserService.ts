import AppErrors from '@shared/errors/AppError';
import User from '../typeorm/entities/user';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const user = await UserRepository.findById( id );

    if (!user) {
      throw new AppErrors('User not found!');
    }

    return user;
  }
}

export default ShowUserService;