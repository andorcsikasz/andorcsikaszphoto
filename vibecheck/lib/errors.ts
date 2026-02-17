/**
 * Standardized Error Handling - ported from RAZ fullstack template
 * Used across vibecheck for consistent API and client error handling.
 */

// ============================================================================
// Error Codes
// ============================================================================

export const ErrorCode = {
  AUTH_REQUIRED: "AUTH_REQUIRED",
  AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN",
  AUTH_EXPIRED_TOKEN: "AUTH_EXPIRED_TOKEN",
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  FORBIDDEN: "FORBIDDEN",
  ADMIN_REQUIRED: "ADMIN_REQUIRED",
  INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  CONFLICT: "CONFLICT",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
  RATE_LIMITED: "RATE_LIMITED",
  TIMEOUT: "TIMEOUT",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

// ============================================================================
// Error Messages
// ============================================================================

export const ErrorMessages: Record<ErrorCode, string> = {
  AUTH_REQUIRED: "Please log in to continue",
  AUTH_INVALID_TOKEN: "Invalid authentication token",
  AUTH_EXPIRED_TOKEN: "Your session has expired, please log in again",
  AUTH_INVALID_CREDENTIALS: "Invalid email or password",
  FORBIDDEN: "You don't have permission to perform this action",
  ADMIN_REQUIRED: "Administrator access required",
  INSUFFICIENT_PERMISSIONS: "Insufficient permissions for this operation",
  VALIDATION_ERROR: "Invalid input data",
  INVALID_INPUT: "The provided input is invalid",
  MISSING_REQUIRED_FIELD: "A required field is missing",
  NOT_FOUND: "The requested resource was not found",
  ALREADY_EXISTS: "This resource already exists",
  CONFLICT: "The operation conflicts with existing data",
  INTERNAL_ERROR: "An unexpected error occurred",
  DATABASE_ERROR: "Database operation failed",
  SERVICE_UNAVAILABLE: "Service is temporarily unavailable",
  EXTERNAL_SERVICE_ERROR: "External service error",
  RATE_LIMITED: "Too many requests, please try again later",
  TIMEOUT: "The operation timed out",
};

// ============================================================================
// AppError Class
// ============================================================================

export interface AppErrorOptions {
  code: ErrorCode;
  message?: string;
  cause?: Error;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
  requestId?: string;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: Record<string, unknown>;
  public readonly statusCode: number;
  public readonly timestamp: string;

  constructor(options: AppErrorOptions) {
    const message = options.message ?? ErrorMessages[options.code];
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.code = options.code;
    this.details = options.details;
    this.statusCode = options.statusCode ?? getHttpStatusForCode(options.code);
    this.timestamp = new Date().toISOString();
  }

  toResponse(requestId?: string): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
      requestId,
    };
  }

  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
  }

  static from(
    error: unknown,
    defaultCode: ErrorCode = ErrorCode.INTERNAL_ERROR
  ): AppError {
    if (error instanceof AppError) return error;
    if (error instanceof Error) {
      return new AppError({ code: defaultCode, message: error.message, cause: error });
    }
    return new AppError({ code: defaultCode, message: String(error) });
  }
}

// ============================================================================
// Error Factories
// ============================================================================

export const Errors = {
  authRequired: (message?: string) =>
    new AppError({ code: ErrorCode.AUTH_REQUIRED, message, statusCode: 401 }),
  invalidToken: (message?: string) =>
    new AppError({ code: ErrorCode.AUTH_INVALID_TOKEN, message, statusCode: 401 }),
  expiredToken: (message?: string) =>
    new AppError({ code: ErrorCode.AUTH_EXPIRED_TOKEN, message, statusCode: 401 }),
  invalidCredentials: (message?: string) =>
    new AppError({ code: ErrorCode.AUTH_INVALID_CREDENTIALS, message, statusCode: 401 }),
  forbidden: (message?: string) =>
    new AppError({ code: ErrorCode.FORBIDDEN, message, statusCode: 403 }),
  adminRequired: (message?: string) =>
    new AppError({ code: ErrorCode.ADMIN_REQUIRED, message, statusCode: 403 }),
  validation: (details: Record<string, unknown>, message?: string) =>
    new AppError({ code: ErrorCode.VALIDATION_ERROR, message, details, statusCode: 400 }),
  invalidInput: (field: string, message?: string) =>
    new AppError({
      code: ErrorCode.INVALID_INPUT,
      message: message ?? `Invalid value for ${field}`,
      details: { field },
      statusCode: 400,
    }),
  notFound: (resource: string, id?: string | number) =>
    new AppError({
      code: ErrorCode.NOT_FOUND,
      message: id ? `${resource} with ID ${id} not found` : `${resource} not found`,
      details: { resource, id },
      statusCode: 404,
    }),
  alreadyExists: (resource: string, message?: string) =>
    new AppError({
      code: ErrorCode.ALREADY_EXISTS,
      message: message ?? `${resource} already exists`,
      details: { resource },
      statusCode: 409,
    }),
  internal: (message?: string, cause?: Error) =>
    new AppError({ code: ErrorCode.INTERNAL_ERROR, message, cause, statusCode: 500 }),
  database: (message?: string, cause?: Error) =>
    new AppError({ code: ErrorCode.DATABASE_ERROR, message, cause, statusCode: 500 }),
  unavailable: (message?: string) =>
    new AppError({ code: ErrorCode.SERVICE_UNAVAILABLE, message, statusCode: 503 }),
  external: (service: string, message?: string) =>
    new AppError({
      code: ErrorCode.EXTERNAL_SERVICE_ERROR,
      message: message ?? `${service} service error`,
      details: { service },
      statusCode: 502,
    }),
  rateLimited: (retryAfter?: number) =>
    new AppError({
      code: ErrorCode.RATE_LIMITED,
      details: retryAfter ? { retryAfter } : undefined,
      statusCode: 429,
    }),
  timeout: (operation?: string) =>
    new AppError({
      code: ErrorCode.TIMEOUT,
      message: operation ? `${operation} timed out` : undefined,
      details: operation ? { operation } : undefined,
      statusCode: 504,
    }),
};

// ============================================================================
// Utilities
// ============================================================================

function getHttpStatusForCode(code: ErrorCode): number {
  const statusMap: Record<ErrorCode, number> = {
    AUTH_REQUIRED: 401,
    AUTH_INVALID_TOKEN: 401,
    AUTH_EXPIRED_TOKEN: 401,
    AUTH_INVALID_CREDENTIALS: 401,
    FORBIDDEN: 403,
    ADMIN_REQUIRED: 403,
    INSUFFICIENT_PERMISSIONS: 403,
    VALIDATION_ERROR: 400,
    INVALID_INPUT: 400,
    MISSING_REQUIRED_FIELD: 400,
    NOT_FOUND: 404,
    ALREADY_EXISTS: 409,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    DATABASE_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    EXTERNAL_SERVICE_ERROR: 502,
    RATE_LIMITED: 429,
    TIMEOUT: 504,
  };
  return statusMap[code] ?? 500;
}

const RETRYABLE_CODES: ErrorCode[] = [
  ErrorCode.SERVICE_UNAVAILABLE,
  ErrorCode.TIMEOUT,
  ErrorCode.RATE_LIMITED,
  ErrorCode.DATABASE_ERROR,
];

export function isRetryableError(error: unknown): boolean {
  return error instanceof AppError && RETRYABLE_CODES.includes(error.code);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message;
  if (error instanceof Error) return error.message;
  return String(error);
}

export function getErrorCode(error: unknown): string | undefined {
  return error instanceof AppError ? error.code : undefined;
}
