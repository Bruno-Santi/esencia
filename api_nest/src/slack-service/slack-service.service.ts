import { Injectable } from '@nestjs/common';
import { CreateSlackServiceDto } from './dto/create-slack-service.dto';
import { UpdateSlackServiceDto } from './dto/update-slack-service.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SlackServiceService {
  private readonly slackToken = process.env.SLACK_TOKEN;
  private readonly slackChannel = process.env.SLACK_CHANNEL;

  constructor(private readonly httpService: HttpService) {}

  async sendNotification(message: string): Promise<void> {
    console.log(this.slackChannel);
    console.log(this.slackToken);

    const url = 'https://slack.com/api/chat.postMessage';
    const payload = {
      channel: `#${this.slackChannel}`,
      text: message,
    };
    const headers = {
      Authorization: `Bearer ${this.slackToken}`,
      'Content-Type': 'application/json',
    };

    try {
      await lastValueFrom(this.httpService.post(url, payload, { headers }));
      console.log('se pudo');
    } catch (error) {
      console.error('Error sending notification to Slack:', error);
    }
  }
  create(createSlackServiceDto: CreateSlackServiceDto) {
    return 'This action adds a new slackService';
  }

  findAll() {
    return `This action returns all slackService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slackService`;
  }

  update(id: number, updateSlackServiceDto: UpdateSlackServiceDto) {
    return `This action updates a #${id} slackService`;
  }

  remove(id: number) {
    return `This action removes a #${id} slackService`;
  }
}
