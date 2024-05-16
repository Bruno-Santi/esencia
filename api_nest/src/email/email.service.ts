import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { subscribeMail } from 'common/utils/subscribeMail';
import { BadRequestError } from 'openai';

@Injectable()
export class EmailService {
  constructor(@InjectSendGrid() private readonly client: SendGridService) {}
  async create(createEmailDto: CreateEmailDto) {
    const { subjectEmail } = createEmailDto;
    try {
      const emailData = subscribeMail(subjectEmail);
      const resp = await this.client.send(emailData);
      console.log(resp);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Hubo un problema al enviar el correo.');
    }
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
