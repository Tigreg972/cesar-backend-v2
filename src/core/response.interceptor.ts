import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function normalize(value: unknown): unknown {
 
  if (typeof value === 'bigint') return value.toString();

  
  if (value instanceof Date) return value.toISOString();

  if (Array.isArray(value)) return value.map(normalize);

  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;

    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = normalize(v);
    return out;
  }

  return value;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => normalize(data)));
  }
}