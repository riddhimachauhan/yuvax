/**
 * Standardized response builder utility
 */
// @ts-check

class ResponseBuilder {
  /**
   * Build success response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Success message
   * @param {Object} data - Response data
   * @param {Object} meta - Additional metadata
   */
  static success(res, statusCode = 200, message = 'Success', data = null, meta = null) {
    const response = {
      success: true,
      message,
      ...(data && { data }),
      ...(meta && { meta }),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Build error response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {Object} errors - Error details
   */
  static error(res, statusCode = 500, message = 'Internal Server Error', errors = null) {
    const response = {
      success: false,
      message,
      ...(errors && { errors }),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Build validation error response
   * @param {Object} res - Express response object
   * @param {Array} validationErrors - Array of validation errors
   */
  static validationError(res, validationErrors) {
    return this.error(res, 400, 'Validation failed', validationErrors);
  }

  /**
   * Build not found response
   * @param {Object} res - Express response object
   * @param {string} message - Not found message
   */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, 404, message);
  }

  /**
   * Build unauthorized response
   * @param {Object} res - Express response object
   * @param {string} message - Unauthorized message
   */
  static unauthorized(res, message = 'Unauthorized') {
    return this.error(res, 401, message);
  }

  /**
   * Build forbidden response
   * @param {Object} res - Express response object
   * @param {string} message - Forbidden message
   */
  static forbidden(res, message = 'Forbidden') {
    return this.error(res, 403, message);
  }

  /**
   * Build created response
   * @param {Object} res - Express response object
   * @param {string} message - Created message
   * @param {Object} data - Created resource data
   */
  static created(res, message = 'Resource created successfully', data = null) {
    return this.success(res, 201, message, data);
  }

  /**
   * Build no content response
   * @param {Object} res - Express response object
   * @param {string} message - No content message
   */
  static noContent(res, message = 'No content') {
    return this.success(res, 204, message);
  }
}

module.exports = ResponseBuilder;
