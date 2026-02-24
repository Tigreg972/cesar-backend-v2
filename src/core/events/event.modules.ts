import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EVENT_BUS } from './event.tokens';
import { NestEventBusService } from './nest-event-bus.service';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    NestEventBusService,
    { provide: EVENT_BUS, useExisting: NestEventBusService },
  ],
  exports: [EVENT_BUS, NestEventBusService, EventEmitterModule],
})
export class EventModule {}