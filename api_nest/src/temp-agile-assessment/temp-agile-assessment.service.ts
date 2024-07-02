import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTempAgileAssessmentDto } from './dto/create-temp-agile-assessment.dto';
import { UpdateTempAgileAssessmentDto } from './dto/update-temp-agile-assessment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class TempAgileAssessmentService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async create(data) {
    try {
      await this.findUser(data.email);
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(email) {
    const user = await this.userModel.findOne({ email: email });
    if (user) throw new BadRequestException('El usuario ya existe.');
    return;
  }
}
