import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { comparePassword } from "../helpers/bcrypt";
import { generateToken } from "../utils/jwt";
import UserController from "./user.controller";

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export class AuthController {
  private userRepository = AppDataSource.manager.getRepository(User);
  private userController = new UserController();

  public async login(req: any, res: any) {
    const { email, password } = req.body;

    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.code(404).send({ message: "User not found" });
      return;
    }

    // Compare the password
    if (!comparePassword(password, user.password)) {
      res.code(401).send({ message: "Invalid credentials" });
      return;
    }

    const userInfo: UserInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = generateToken(userInfo);

    res.send({
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  }

  async register(req: any, res: any) {
    try {
      this.userController.createUser(req, res);
      res.send({ message: "User created successfully" });
    } catch (error) {
      res.code(500).send({ message: error.message });
    }
  }

  async logout(req: any, res: any) {
    res.send({ message: "Logout successful" });
  }
}
