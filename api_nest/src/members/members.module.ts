import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TeamModule } from 'src/team/team.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './entities/member.entity';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';

@Module({
  controllers: [MembersController],
  providers: [MembersService, JwtAuthGuard],
  imports: [
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
        collection: 'members',
      },
    ]),
    TeamModule,
  ],
  exports: [MongooseModule],
})
export class MembersModule {}
