import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TeamModule } from 'src/team/team.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './entities/member.entity';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MembersController],
  providers: [MembersService, JwtAuthGuard],
  imports: [
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'user',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
        collection: 'members',
      },
    ]),
    JwtModule,
    TeamModule,
    AuthModule,
  ],
  exports: [MembersModule, MongooseModule, MembersService],
})
export class MembersModule {}
