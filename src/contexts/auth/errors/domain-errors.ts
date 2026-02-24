export type DomainErrorPayload = {
  code: string;
  message: string;
  fields?: Record<string, string>;
  details?: unknown;
  statusCode?: number;
};

export class DomainError extends Error {
  public readonly code: string;
  public readonly fields?: Record<string, string>;
  public readonly details?: unknown;
  public readonly statusCode: number;

  constructor(payload: DomainErrorPayload) {
    super(payload.message);
    this.code = payload.code;
    this.fields = payload.fields;
    this.details = payload.details;
    this.statusCode = payload.statusCode ?? 400;
  }
}