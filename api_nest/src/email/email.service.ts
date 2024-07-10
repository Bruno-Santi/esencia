import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { subscribeMail } from 'common/utils/subscribeMail';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { sendVerifyEmail } from 'common/utils/sendVerifyEmail';
import { sendAssessmentEmail } from 'common/utils/sendAssessmentEmail';

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

  async sendVerificationEmail(user, token: string) {
    try {
      const emailData = await sendVerifyEmail(user.name, user.email, token);
      await this.client.send(emailData);
    } catch (error) {
      console.log(error);
    }
  }

  async sendAssessmentEmail(data) {
    console.log(data[0].email);
    try {
      const emailData = await sendAssessmentEmail(
        data[0].analysis,
        data[0].email,
        data[0].agileindex,
        data[0].teamName,
      );
      await this.client.send(emailData);
    } catch (error) {
      console.log(error);
    }
  }
}
