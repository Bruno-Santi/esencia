import { Module } from '@nestjs/common';
import { RetroService } from './retro.service';
import { RetroGateway } from './retro.gateway';
import { MembersModule } from 'src/members/members.module';
import { RetroEmailController } from './retro.controller';

import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { TeamModule } from 'src/team/team.module';
import { MembersService } from 'src/members/members.service';
import { MongooseModule } from '@nestjs/mongoose';

import { MailerModule } from '@nestjs-modules/mailer';
import { Retro, RetroSchema } from './entities/retro.entity';

@Module({
  controllers: [RetroEmailController],
  providers: [RetroGateway, RetroService, MembersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Retro.name,
        schema: RetroSchema,
        collection: 'TeamRetro',
      },
    ]),
    // Coma adicional eliminada aquí
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        authMethod: 'PLAIN',
      },
    }),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    MembersModule,
    TeamModule,
  ],
})
export class RetroModule {}
