import { FastifyInstance } from "fastify";
import { AuthController } from "./controllers/auth.controller";
import UserController from "./controllers/user.controller";
import { AuthValidators } from "./middlewares/validators/authValidators";

async function routes(fastify: FastifyInstance, options: any) {
  const userController = new UserController();
  const authController = new AuthController();
  const authValidators = new AuthValidators();


  fastify.route({
    method: "POST",
    url: "/api/register",
    handler: authController.register.bind(authController),
    preValidation: authValidators.registerValidator
  });

  fastify.route({
    method: "DELETE",
    url: "/api/delete-user/:id",
    handler: userController.deleteUser.bind(userController),
  });

  fastify.route({
    method: "GET",
    url: "/api/users",
    handler: userController.getUsers.bind(userController),
  });

  fastify.route({
    method: "GET",
    url: "/api/user/:id",
    handler: userController.getUser.bind(userController),
  });

  fastify.route({
    method: "PUT",
    url: "/api/update-user/:id",
    handler: userController.updateUser.bind(userController),
  });

  fastify.route({
    method: "POST",
    url: "/api/login",
    preValidation: (request, reply, done) => {
      authValidators.loginValidator(request, reply, done);
    },
    handler: authController.login.bind(authController),
  });
}

export default routes;
