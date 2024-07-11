import { FastifyReply } from "fastify";
import { AppDataSource } from "../data-source";
import { ContactMessage } from "../entity/ContactMessage";

export class SupportService {
  private contactRepository = AppDataSource.getRepository(ContactMessage);
  async saveContactMessage(req: any, reply: FastifyReply) {
    try {
      this.contactRepository.create(req);
      await this.contactRepository.save(req);
      reply.code(201).send({ message: "Contact message created" });
    } catch (error) {
      reply.code(500).send({ error: "Failed to create contact message" });
    }
  }
}
