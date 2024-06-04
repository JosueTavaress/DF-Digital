export const HTTP_CODE = {
  HTTP_OK: 200,
  HTTP_CREATED: 201,
  HTTP_ACCEPTED: 202,
  HTTP_NO_CONTENT: 204,
  HTTP_BAD_REQUEST: 400,
  HTTP_UNAUTHORIZED: 401,
  HTTP_FORBIDDEN: 403,
  HTTP_NOT_FOUND: 404,
  HTTP_METHOD_NOT_ALLOWED: 405,
  HTTP_INTERNAL_SERVER_ERROR: 500,
  HTTP_SERVICE_UNAVAILABLE: 503,
  HTTP_CONFLICT: 409
}

export class ApiError extends Error {
  public readonly statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode;
  }
}

export class ConflictRequestError extends ApiError {
  public readonly statusCode: number
  constructor(message: string, statusCode = HTTP_CODE.HTTP_CONFLICT) {
    super(message, statusCode)
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, statusCode = HTTP_CODE.HTTP_BAD_REQUEST) {
    super(message, statusCode)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, statusCode = HTTP_CODE.HTTP_UNAUTHORIZED) {
    super(message, statusCode)
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error", statusCode = HTTP_CODE.HTTP_INTERNAL_SERVER_ERROR) {
    super(message, statusCode)
  }
}