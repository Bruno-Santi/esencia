import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { ParseMongoIdPipe } from 'common/pipes/parse-mongo-id.pipe';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.entity';

@Module({
  controllers: [TeamController],
  providers: [TeamService, JwtAuthGuard, ParseMongoIdPipe],
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema,
        collection: 'teams',
      },
    ]),
    AuthModule,
  ],
  exports: [TeamService],
})
export class TeamModule {}
