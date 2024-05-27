import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlackServiceService } from './slack-service.service';
import { CreateSlackServiceDto } from './dto/create-slack-service.dto';
import { UpdateSlackServiceDto } from './dto/update-slack-service.dto';

@Controller('slack-service')
export class SlackServiceController {
  constructor(private readonly slackServiceService: SlackServiceService) {}

  @Post()
  create(@Body() createSlackServiceDto: CreateSlackServiceDto) {
    return this.slackServiceService.create(createSlackServiceDto);
  }

  @Get()
  findAll() {
    return this.slackServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slackServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlackServiceDto: UpdateSlackServiceDto) {
    return this.slackServiceService.update(+id, updateSlackServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slackServiceService.remove(+id);
  }
}
