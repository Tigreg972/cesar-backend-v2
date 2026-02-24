import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NestEventBusService {
  constructor(private readonly emitter: EventEmitter2) {}

  emit(eventName: string, payload: any) {
    this.emitter.emit(eventName, payload);
  }
}
