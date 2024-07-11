import { logger } from "../../app";
import { CreateUserReq } from "../../controllers/user.controller";

export class AuthValidators {
  async loginValidator(req: any, reply: any, done: any) {
    console.log("loginValidator middleware");
    const { email, password } = req.body;

    if (!email || !password) {
      reply.code(400).send({ error: "Missing required fields" });
      return;
    }

    done();
  }

  async registerValidator(req: any, reply: any, done: any) {
    console.log('register validator', req.body)
    const { firstName, lastName, email, password, confirmPassword } =
      req.body as CreateUserReq;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      console.log("firstName" + firstName);
      console.log("lastName" + lastName);
      console.log("email" + email);
      console.log("password" + password);
      console.log("confirmPassword" + confirmPassword);
      logger.error("All fields are required");
      reply.code(422).send({ message: "All fields are required" });
      return;
    }
    if (password !== confirmPassword) {
      reply
        .code(422)
        .send({ message: "Password and Confirm Password do not match" });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      reply.code(422).send({ message: "Invalid email" });
      return;
    }

    done();
  }
}
