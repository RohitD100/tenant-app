import axios from "axios";

/**
 * Utility function to extract a meaningful error message from an error object.
 * It handles both Axios errors and general JavaScript errors.
 *
 * @param err - The error object, which can be of any type (unknown).
 * @returns A string representing the error message.
 */
export const getErrorMessage = (err: unknown): string => {
  // Check if the error is an AxiosError
  if (axios.isAxiosError(err)) {
    // Return the message from the Axios response, or a default message
    return err.response?.data?.message || err.message || "Axios error";
  }
  // Check if the error is a general JavaScript Error
  else if (err instanceof Error) {
    return err.message;
  }
  // Return a default message for any other error type
  else {
    return "Unknown error occurred";
  }
};
