import { Controller, Get, Response } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('sse')
export class SseController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Get('cards')
  async streamSSE(@Response() res) {
    console.log('holas');

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const handler = (event, data) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    this.eventEmitter.on('card_created', handler);
    this.eventEmitter.on('card_updated', handler);
    this.eventEmitter.on('card_deleted', handler);

    res.on('close', () => {
      console.log('cerrado');

      this.eventEmitter.removeListener('card_created', handler);
      this.eventEmitter.removeListener('card_updated', handler);
      this.eventEmitter.removeListener('card_deleted', handler);
    });
  }
}
