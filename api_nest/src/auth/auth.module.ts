import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ScrumMaster, ScrumMasterSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ScrumMaster.name,
        schema: ScrumMasterSchema,
        collection: 'auth',
      },
    ]),
    JwtModule,
  ],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
