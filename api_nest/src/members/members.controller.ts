import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
@UseGuards(JwtAuthGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get(':teamId')
  get(@Param('teamId') teamId: string) {
    return this.membersService.getTeamMembers(teamId);
  }
}
