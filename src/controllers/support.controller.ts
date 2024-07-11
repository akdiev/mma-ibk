import { FastifyReply } from "fastify";
import { ContactMessage } from "../entity/ContactMessage";
import { AppDataSource } from "../data-source";
import { SupportService } from "../services/supportService";

export class SupportController {
  private contactRepository = AppDataSource.getRepository(ContactMessage);
  private supportService = new SupportService();

  async createContactMessage(req: any, reply: FastifyReply) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      reply.code(400).send({ error: "Missing required fields" });
      return;
    }

    const contactMessage = new ContactMessage();
    contactMessage.name = name;
    contactMessage.email = email;
    contactMessage.message = message;

    try {
      this.supportService.saveContactMessage(contactMessage, reply);
      reply.code(201).send({ message: "Contact message created" });
    } catch (error) {
      reply.code(500).send({ error: "Failed to create contact message" });
    }
  }

  //   async getSupport(req: any, reply: FastifyReply) {}
}
