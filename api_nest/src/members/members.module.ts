import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TeamModule } from 'src/team/team.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './entities/member.entity';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MembersController],
  providers: [MembersService, JwtAuthGuard],
  imports: [
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
        collection: 'members',
      },
    ]),
    JwtModule,
    TeamModule,
  ],
  exports: [MembersModule, MongooseModule],
})
export class MembersModule {}
