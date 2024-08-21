import AppErrors from '@shared/errors/AppError';
import User from '../typeorm/entities/user';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  new_password: string;
  old_password: string
}

class UpdateUserService {
  public async execute({ id, name, email, new_password, old_password }: IRequest): Promise<User> {
    console.log(name, old_password);


    const user = await UserRepository.findById(id);
    const emailExists = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('User not found!');
    }
    // console.log(id)

    if (email) {
      if (emailExists && emailExists.id != user.id) {
        throw new AppErrors('Email address already used');
      }
      user.email = email;
    }

    // Verifica a senha antiga
    const checkOldPassword = await compare(old_password, user.password);
    if (!checkOldPassword) {
      throw new AppErrors('Old password does not match.');
    }

    user.name = name;
    if (new_password) {

      user.password = await hash(new_password, 8);
    }

    await UserRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
