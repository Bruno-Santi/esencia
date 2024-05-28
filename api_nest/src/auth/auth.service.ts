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
import { SlackServiceService } from 'src/slack-service/slack-service.service';
import { convertStringToObj } from 'common/utils/converStringToObj';

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
    private readonly slackService: SlackServiceService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const password = await encodePassword(createAuthDto.password);
      const newUser = { ...createAuthDto, password };
      const user = await this.scrumMasterModel.create(newUser);

      // Enviar notificación a Slack
      const message = `Un nuevo usuario se ha registrado: ${user.name} (${user.email})`;

      const respslack = await this.slackService.sendNotification(message);
      console.log(respslack);

      return {
        payload: `User ${user.email} created successfully!`,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already in use');
      }
      throw new BadRequestException(error.message);
    }
  }
  async setFirstLoggin(userId: string) {
    const convertedUserId = convertStringToObj(userId);
    try {
      const user = await this.scrumMasterModel.findByIdAndUpdate(
        convertedUserId,
        { firstLoggin: false },
        { new: true },
      );

      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Error al actualizar el estado de firstLoggin');
    }
  }
  async findOne(getUserDto: GetUserDto) {
    const { email, password, method, uid, name, avatar } = getUserDto;
    console.log(getUserDto);

    try {
      let user = await this.scrumMasterModel.findOne({
        email: email,
        method: method,
      });

      if (user) {
        if (method === 'Google') {
          // Autentica al usuario con Google
          if (user.uid !== uid) {
            throw new BadRequestException('Invalid UID for Google method');
          }
        } else {
          // Verifica la contraseña para métodos diferentes a Google
          const passwordValid = await passwordCompare(password, user.password);
          if (!passwordValid) {
            throw new BadRequestException('Invalid email or password');
          }
        }
      } else {
        // Si no se encuentra un usuario con ese correo y método, registra un nuevo usuario
        user = new this.scrumMasterModel({
          email,
          name,
          avtColor: avatar,
          method,
          uid,
          role: 'admin',
        });
        const message = `Un nuevo usuario se ha registrado: ${user.name} (${user.email})`;

        await this.slackService.sendNotification(message);
        await user.save();
      }

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
          avtColor: user.avtColor,
          role: user.role,
          method: user.method || null,
          firstLoggin: user.firstLoggin,
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
