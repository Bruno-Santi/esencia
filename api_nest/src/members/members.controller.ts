import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    console.log(createMemberDto);

    return this.membersService.create(createMemberDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':teamId')
  get(@Param('teamId') teamId: string) {
    console.log(teamId);

    return this.membersService.getTeamMembers(teamId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':memberId')
  deleteOne(@Param('memberId') memberId: string) {
    return this.membersService.deleteTeamMember(memberId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/invite/:memberId')
  inviteOne(@Param('memberId') memberId: string, @Body() teamid: string) {
    return this.membersService.inviteMember(memberId, teamid);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/teams/:memberId')
  // getTeam(@Param('memberId') memberId: string) {
  //   return this.membersService.getMemberTeam(memberId);
  // }

  // @Post('/login') // Ruta para el inicio de sesión
  // async loginUser(@Body() messageBody: any) {
  //   const { email, password } = messageBody;
  //   return this.membersService.login(email, password);
  // }
}
