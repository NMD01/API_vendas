import User from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

class UserListService {
  public async execute(): Promise<User[]> {
    const userList = await UserRepository.find();

    return userList;
  }
}

export default UserListService;