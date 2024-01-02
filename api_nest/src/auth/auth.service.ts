import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ScrumMaster } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encodePassword } from 'common/password-crypt';
import { passwordCompare } from 'common/password-compare';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ScrumMaster.name)
    private readonly scrumMasterModel: Model<ScrumMaster>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const password = await encodePassword(createAuthDto.password);
      const newUser = await { ...createAuthDto, password };
      const user = await this.scrumMasterModel.create(newUser);
      console.log(user);
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(`Email already in use`);
      console.log(error);
    }
  }

  async findOne(getUserDto: GetUserDto) {
    try {
      const { email, password } = await getUserDto;

      const user = await this.scrumMasterModel.findOne({ email: email });

      if (!user) throw new BadRequestException(`Invalid email or password`);
      const passwordValid = await passwordCompare(password, user.password);
      if (!passwordValid)
        throw new BadRequestException(`Invalid email or password`);
      const token = this.jwtService.sign(
        { sub: user._id },
        { secret: process.env.JWT_SECRET_KEY },
      );
      return {
        token: token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
