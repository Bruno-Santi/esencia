import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { RetroService } from './retro.service';

@Controller('retro-email')
export class RetroEmailController {
  constructor(private readonly retroService: RetroService) {}

  @Get(':teamId/send-email')
  sendEmailToTeamMembers(@Param('teamId') teamId: string) {
    try {
      if (this.retroService.isValidTeamId(teamId)) {
        console.log(this.retroService.isValidTeamId(teamId));

        this.retroService.sendEmailToMembers(teamId);
      }
    } catch (error) {
      throw new BadRequestException('Invalid teamId format');
    }

    console.log(teamId);
  }
}
