import AppErrors from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/user';
import fs from "fs"
import path from 'path';
import uploadConfig from "@config/upload"

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName,  }: IRequest): Promise<User> {
    const user = await UserRepository.findById(user_id);

    if(!user){
      throw new AppErrors("User not found.")
    }

    if(user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar)
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarExists){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName
    await UserRepository.save(user)

    return user

  }
}

export default UpdateUserAvatarService;
