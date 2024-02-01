import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ScrumMaster, ScrumMasterSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TeamModule } from 'src/team/team.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ScrumMaster.name,
        schema: ScrumMasterSchema,
        collection: 'scrumMaster',
      },
    ]),
    JwtModule,
    TeamModule,
  ],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
