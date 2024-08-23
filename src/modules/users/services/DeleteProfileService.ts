import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';


interface IRequest {
  id: string;
  password: string
}

class DeleteUserService {
  public async execute({ id, password }: IRequest): Promise<void> {
    const user = await UserRepository.findById( id );


    if (!user) {
      throw new AppErrors('User not found!');
    }

    // Verifica a senha antiga
    if (password) {
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        throw new AppErrors('Password does not match.');
      }
    }

    await UserRepository.remove(user);
  }
}

export default DeleteUserService;