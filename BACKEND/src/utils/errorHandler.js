export const errorHandler = (err, req, res, next) => {
    // Log error to console for debugging
    console.error('Error:', err);
    
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            SUCCESS: false,
            message: err.message || "Internal Server Error",
        });
    }
    
    // FALLBACK FOR UNHANDLED ERRORS
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    res.status(500).json({
        SUCCESS: false,
        message: isDevelopment ? (err.message || 'Internal Server Error') : 'Internal Server Error',
        ...(isDevelopment && { stack: err.stack, error: err.toString() }),
    });
};

export class AppError extends Error {
    statusCode;
    isOperational;
  
    constructor(message, statusCode = 500, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
  }
  
  export class ConflictError extends AppError {
    constructor(message = "Conflict occurred") {
      super(message, 409);
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message = "Bad request") {
      super(message, 400);
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
      super(message, 401);
    }
  }
