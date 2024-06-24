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
import { EmailService } from 'src/email/email.service';

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
    private readonly emailService: EmailService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const password = await encodePassword(createAuthDto.password);
      const newUser = { ...createAuthDto, password };
      const user = await this.scrumMasterModel.create(newUser);

      const token = this.jwtService.sign(
        {
          email: user.email,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: '1d',
        },
      );
      await this.emailService.sendVerificationEmail(user, token);

      return {
        payload: `Usuario ${user.email} creado correctamente!`,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('El correo ya se encuentra registrado.');
      }
      throw new BadRequestException(error.message);
    }
  }

  async verifyEmail(token: string) {
    const cleanToken = token.replace(/[^a-zA-Z0-9-_.]/g, '');

    try {
      // Verificar el token JWT
      const payload = this.jwtService.verify(cleanToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const user = await this.scrumMasterModel.findOneAndUpdate(
        { email: payload.email },
        { emailVerified: true },
        { new: true },
      );

      if (!user) {
        throw new BadRequestException(
          'Token inválido o usuario no encontrado.',
        );
      }

      const message = `Un nuevo usuario se ha registrado: ${user.name} (${user.email})`;
      await this.slackService.sendNotification(message);

      return {
        message: 'El correo se ha validado correctamente.',
      };
    } catch (error) {
      console.error('Error en la verificación del token:', error);
      throw new BadRequestException('Token inválido o expirado.');
    }
  }

  async resendVerificationEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const user = await this.scrumMasterModel.findOne({
        email: payload.email,
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      const newToken = this.jwtService.sign(
        { email: user.email },
        { secret: process.env.JWT_SECRET_KEY, expiresIn: '1d' },
      );

      await this.emailService.sendVerificationEmail(user.email, newToken);

      return { message: 'Verification email resent.' };
    } catch (error) {
      throw new BadRequestException('Error resending verification email.');
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
      let user;

      // Si el método no es Google, primero busca al usuario por email
      if (method !== 'Google') {
        user = await this.scrumMasterModel.findOne({ email });

        if (user) {
          const passwordValid = await passwordCompare(password, user.password);
          if (!passwordValid) {
            throw new BadRequestException('Credenciales inválidas.');
          }
          if (!user.emailVerified)
            throw new BadRequestException('Correo no verificado.');
        } else {
          throw new BadRequestException('Credenciales inválidas.');
        }
      } else {
        // Si el método es Google, busca al usuario por email y método
        user = await this.scrumMasterModel.findOne({ email, method });

        if (user) {
          // Verifica el UID para autenticación con Google
          if (user.uid !== uid) {
            throw new BadRequestException('Invalid UID for Google method');
          }
        } else {
          // Si no se encuentra un usuario con ese correo y método, registra un nuevo usuario
          user = new this.scrumMasterModel({
            email,
            name,
            avtColor: avatar,
            method,
            uid,
            emailVerified: true,
            role: 'admin',
          });

          const message = `Un nuevo usuario se ha registrado: ${user.name} (${user.email})`;
          await this.slackService.sendNotification(message);

          await user.save();
        }
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
