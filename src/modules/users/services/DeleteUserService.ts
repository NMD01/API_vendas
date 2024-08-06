import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';


interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const user = await UserRepository.findById( id );

    if (!user) {
      throw new AppErrors('User not found!');
    }

    await UserRepository.remove(user);
  }
}

export default DeleteUserService;