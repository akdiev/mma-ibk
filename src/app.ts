require("reflect-metadata");
const fastify = require("fastify");
import { AppDataSource } from "./data-source";
import routes from "./router";
const winston = require("winston");
import { FastifyRequest, FastifyReply } from "fastify";

import middie from "@fastify/middie";

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

AppDataSource.initialize().catch((error) => console.log(error));

const app: any = fastify({ logger: true });
app.register(routes);
app.register(require("@fastify/autoload"), {
  dir: __dirname + "/routes",
});
app.register(middie).then(() => {
  // Global middleware
  app.use((req: FastifyRequest, res: FastifyReply, next: any) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

  app.setErrorHandler(
    (error: Error, req: FastifyRequest, res: FastifyReply) => {
      console.log("ERROR HAPPENED");
      logger.error({
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        headers: req.headers,
      });

      res.status(500).send({ error: "Internal Server Error" });
    }
  );

  // app.use('/api/delete-user/:id', UserMidlewares.validateDeleteUserReq);
});

let server: any;

async function start() {
  try {
    server = await app.listen({port: 3334}, (error: Error) => {
      console.log("ERRRORRR", error);
      if (error) {
        logger.error(error);
        process.exit(1);
      }

    console.log("SErVERR", server)
      console.log(`Server listening on port ${3334}`);
    });
  } catch (err) {
    console.log("ERRRORRR", err);
    logger.error(err);
    process.exit(1);
  }
}

start();


export default server;