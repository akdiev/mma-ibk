import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserService {
  private userRepository = AppDataSource.manager.getRepository(User);
  async createUser(body: User) {
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
