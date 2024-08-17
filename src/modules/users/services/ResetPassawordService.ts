import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokensRepository ';
import {isAfter, addHours} from "date-fns"
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await UserTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppErrors('user Token does not exists');
    }

    const user = await UserRepository.findById(userToken.user_id)


    if(!user){
      throw new AppErrors("user does not exists")
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if(isAfter(Date.now(), compareDate)){
      throw new AppErrors("token expired")
    }

    user.password = await hash(password, 8)
    await UserRepository.save(user)

    await UserTokenRepository.delete(userToken.id);

  }
}

export default ResetPasswordService;
