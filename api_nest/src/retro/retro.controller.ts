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

  @Post('/create')
  createRetro(@Body() retroData: any) {
    // `retroData` ahora contiene los datos enviados en el cuerpo de la solicitud
    return this.retroService.createRetro(retroData);
  }
}
