import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgileassessmentService } from './agileassessment.service';
import { CreateAgileassessmentDto } from './dto/create-agileassessment.dto';
import { UpdateAgileassessmentDto } from './dto/update-agileassessment.dto';

@Controller('agileassessment')
export class AgileassessmentController {
  constructor(private readonly agileassessmentService: AgileassessmentService) { }

  @Post(':teamid/')
  createAgileAssessment(
    @Param('teamid') teamId: string,
    @Body('teamGoalsAndFunctions') teamGoalsAndFunctions: string,
    @Body('teamChallenges') teamChallenges: string,
    @Body('teamCultureAndValues') teamCultureAndValues: string,
    @Body('agileQuestions') agileQuestions: any[]) {

    return this.agileassessmentService.createAgileAssessment(teamId, teamGoalsAndFunctions, teamChallenges, teamCultureAndValues, agileQuestions);
  }

  @Get(":teamid/")
  findAll(@Param('teamid') teamId: string) {
    return this.agileassessmentService.findAll(teamId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agileassessmentService.remove(+id);
  }
}