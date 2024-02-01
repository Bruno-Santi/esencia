import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { RetroService } from './retro.service';

@Controller('retro-email')
export class RetroEmailController {
  constructor(private readonly retroService: RetroService) {}

  @Get(':team_id')
  sendEmailToTeamMembers(@Param('team_id') team_id: string) {
    try {
      if (this.retroService.isValidTeamId(team_id)) {
        console.log(this.retroService.isValidTeamId(team_id));

        this.retroService.sendEmailToMembers(team_id);
      }
    } catch (error) {
      throw new BadRequestException('Invalid teamId format');
    }

    console.log(team_id);
  }

  @Post('/create')
  createRetro(@Body() retroData: any) {
    // `retroData` ahora contiene los datos enviados en el cuerpo de la solicitud
    return this.retroService.createRetro(retroData);
  }
}
