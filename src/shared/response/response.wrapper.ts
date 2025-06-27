import { ResponseCodes } from "./response.codes";

/**
 * Utility class to standardize API responses.
 */
export class ResponseWrapper {
  /**
   * Wraps successful responses.
   * @param code - Response code indicating success.
   * @param message - Success message.
   * @param data - Data payload.
   * @returns Standardized success response.
   */
  static success(code: ResponseCodes, message: string, data: any): any {
    return { code, message, data };
  }

  /**
   * Wraps error responses.
   * @param code - Response code indicating error.
   * @param message - Error message.
   * @param data - Optional error data.
   * @returns Standardized error response.
   */
  static error(code: ResponseCodes, message: string, data: any = null): any {
    return { code, message, data };
  }
}

