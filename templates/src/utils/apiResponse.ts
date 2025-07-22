// src/utils/apiResponse.ts
/**
 * @typedef {object} ApiResponse
 * @property {string} status - Indicates the status of the response, typically "success".
 * @property {string} [message] - An optional human-readable message about the operation.
 * @property {any} [data] - The actual payload of the response.
 */

/**
 * Creates a standardized success API response object.
 *
 * @param {any} [data] - The main data payload to be returned.
 * @param {string} [message] - An optional message describing the success.
 * @returns {ApiResponse} A standardized success response object.
 */
function apiResponse<T>(data?: T, message?: string) {
  return {
    status: 'success',
    message: message || 'Operation successful.',
    data,
  };
}

export default apiResponse;
