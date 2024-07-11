import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entity/User";
import { UserService } from "../services/userService";
import { AppDataSource } from "../data-source";
import { logger } from "../app";
import { hashPassword } from "../helpers/bcrypt";

export interface CreateUserReq extends User {
  confirmPassword: string;
}

export class UserController {
  private userService = new UserService();
  private userRepository = AppDataSource.manager.getRepository(User);
  // Add your controller methods here
  public async createUser(req: FastifyRequest, res: FastifyReply) {
    const { firstName, lastName, email, password, confirmPassword } =
      req.body as CreateUserReq;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = await hashPassword(password);

    try {
      await this.userService.createUser(user);
      res.send({ message: "User created successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "An error occurred while creating the user" });
    }
  }

  public async deleteUser(req: FastifyRequest, res: FastifyReply) {
    console.log("params", req.params);
    const { id } = req.params as any;

    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log("user to delete", user);

    if (!user) {
      res.send({ message: `There is no user with id: ${id}` });
      return;
    }

    try {
      await this.userService.deleteUser(id);
      res.send({ message: `User with id: ${id} deleted successfully` });
    } catch (error) {
      res
        .status(500)
        .send({ message: "An error occurred while deleting the user" });
    }
  }

  public async getUser(req: any, res: FastifyReply) {
    const user = await this.userRepository.find({
      where: {
        id: req.params.id,
      },
    });
    res.send(user);
  }

  public async getUsers(req: any, res: FastifyReply) {
    const users = await this.userRepository.find();
    res.send(users);
  }

  public async updateUser(req: any, res: FastifyReply) {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body as User;

    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.send({ message: `There is no user with id: ${id}` });
      return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    try {
      await this.userRepository.save(user);
      res.send({ message: `User with id: ${id} updated successfully` });
    } catch (error) {
      res
        .status(500)
        .send({ message: "An error occurred while updating the user" });
    }
  }
}

export default UserController;
