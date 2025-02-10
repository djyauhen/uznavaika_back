import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendMessage(
    @Body()
    body: {
      name: string;
      category: string;
      childAge: string;
      phone: string;
    },
  ) {
    return await this.contactService.sendEmail(
      body.name,
      body.category,
      body.childAge,
      body.phone,
    );
  }
}
