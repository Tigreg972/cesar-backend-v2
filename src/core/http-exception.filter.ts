import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from './errors/domain-error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // Domain error
    if (exception instanceof DomainError) {
      return res.status(exception.statusCode).json({
        code: exception.code,
        message: exception.message,
        fields: exception.fields,
        details: exception.details,
        path: req.url,
        method: req.method,
      });
    }

    // HttpException (Nest)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse() as any;
      return res.status(status).json({
        code: response?.code ?? 'HTTP_ERROR',
        message: response?.message ?? exception.message,
        details: response,
        path: req.url,
        method: req.method,
      });
    }

    // Unknown
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 'INTERNAL_ERROR',
      message: 'Unexpected error',
      details: exception,
      path: req.url,
      method: req.method,
    });
  }
}