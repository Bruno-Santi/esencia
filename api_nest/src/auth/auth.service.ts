import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ScrumMaster } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { encodePassword } from 'common/password-crypt';
import { passwordCompare } from 'common/password-compare';
import { JwtService } from '@nestjs/jwt';
import { Team } from 'src/team/entities/team.entity';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ScrumMaster.name)
    private readonly scrumMasterModel: Model<ScrumMaster>,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const password = await encodePassword(createAuthDto.password);
      const newUser = await { ...createAuthDto, password };
      const user = await this.scrumMasterModel.create(newUser);
      return {
        payload: `User ${user.email} created successfully!`,
      };
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
      const teams = await this.teamService.findAllTeams(user._id);

      return {
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        teams,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findScrumMaster(scrumId) {
    try {
      const convertedScrumId = new Types.ObjectId(scrumId);

      const scrumMaster = await this.scrumMasterModel.findOne({
        _id: convertedScrumId,
      });

      if (!scrumMaster) {
        throw new BadRequestException(
          `Scrum master with ${scrumId} doesn't exist`,
        );
      }

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
