import { Module } from '@nestjs/common';
import { RetroService } from './retro.service';
import { RetroGateway } from './retro.gateway';
import { MembersModule } from 'src/members/members.module';
import { RetroEmailController } from './retro.controller';
import { TeamService } from 'src/team/team.service';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { TeamModule } from 'src/team/team.module';
import { MembersService } from 'src/members/members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StickyNote, StickyNoteSchema } from './entities/sticky-note.entity';

@Module({
  controllers: [RetroEmailController],
  providers: [RetroGateway, RetroService, MembersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: StickyNote.name,
        schema: StickyNoteSchema,
        collection: 'stickynotes',
      },
    ]),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    MembersModule,
    TeamModule,
  ],
})
export class RetroModule {}
