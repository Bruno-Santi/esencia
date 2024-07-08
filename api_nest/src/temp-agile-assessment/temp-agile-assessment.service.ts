import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';
import { AgileassessmentService } from 'src/agileassessment/agileassessment.service';
import { TeamService } from 'src/team/team.service';
import { TempAgileAssessment } from './entities/temp-agile-assessment.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TempAgileAssessmentService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(TempAgileAssessment.name)
    private readonly tempAgileAssessmentModel: Model<TempAgileAssessment>,
    private readonly agileAssessmentService: AgileassessmentService,
    private readonly teamService: TeamService,
    private readonly emailService: EmailService,
  ) {}

  async create(data) {
    console.log(data);

    try {
      await this.findUser(data.email);
      const {
        teamName,
        teamObjectivesAndFunctions,
        teamDailyChallenges,
        teamCultureAndValues,
        agileQuestions,
        members = [],
      } = data;
      console.log(data);

      // Convertir agileQuestions a un array de objetos
      const formattedAgileQuestions = agileQuestions.map(
        ({ id, question, score, area }) => ({
          id,
          question,
          score,
          area,
        }),
      );

      console.log(formattedAgileQuestions);

      const teamDto = {
        name: teamName,
        logo: data.logo,
        members: members,
      };
      const team = await this.teamService.createTempTeam(teamDto);
      console.log(team);

      const teamId = team._id.toString();
      console.log(data.teamObjectivesAndFunctions, data.teamDailyChallenges);

      const assessment =
        await this.agileAssessmentService.createAgileAssessment(
          teamId,
          data.teamObjectivesAndFunctions,
          teamDailyChallenges,
          teamCultureAndValues,
          formattedAgileQuestions,
        );

      console.log(assessment);

      const tempAssessment = new this.tempAgileAssessmentModel({
        email: data.email,
        teamName: teamName,
        agileQuestions: formattedAgileQuestions,
        teamObjectivesAndFunctions: teamObjectivesAndFunctions,
        teamDailyChallenges,
        teamCultureAndValues: teamCultureAndValues,
        teamId: teamId,
        agileindex: assessment.agileindex,
        analysis: assessment.analysis,
        recommendations: assessment.recommendations,
      });

      await tempAssessment.save();
      await this.emailService.sendAssessmentEmail(tempAssessment);
      return tempAssessment;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al crear la evaluación.');
    }
  }

  async findUser(email) {
    let user = await this.userModel.findOne({ email: email });
    user = await this.tempAgileAssessmentModel.findOne({ email: email });
    if (user) throw new BadRequestException('El usuario ya existe.');
    return;
  }
}
