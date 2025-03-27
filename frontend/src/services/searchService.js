// src/services/searchService.js
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase"; // Import the initialized functions instance

// Get a reference to the deployed 'searchDocuments' cloud function
const searchDocumentsCallable = httpsCallable(functions, 'searchDocuments');

/**
 * Calls the searchDocuments Cloud Function with the provided query.
 * @param {string} searchQuery - The user's search query.
 * @returns {Promise<object>} A promise that resolves with the data returned
 * from the cloud function (likely OpenAI response)
 * or rejects with an error.
 */
export const callSearchDocuments = async (searchQuery) => {
  if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim() === '') {
    console.error("Search query cannot be empty.");
    throw new Error("Search query cannot be empty.");
  }

  console.log(`Calling searchDocuments function with query: "${searchQuery}"`);

  try {
    // Call the function, passing the query in the data object
    const result = await searchDocumentsCallable({ query: searchQuery });

    console.log("Received result from searchDocuments function:", result);

    // The 'data' property of the result contains the value returned by the function
    // Assuming our function returns { success: true, data: output }
    if (result.data && result.data.success) {
      return result.data.data; // Return the actual data payload (e.g., OpenAI output)
    } else {
      // Handle cases where the function executed but indicated failure
      const errorMsg = result.data?.message || "Cloud function returned success=false or unexpected format.";
      console.error("Cloud function execution failed:", errorMsg);
      throw new Error(errorMsg);
    }
  } catch (error) {
    // Handle errors from the httpsCallable itself (e.g., network errors, permission errors)
    console.error("Error calling searchDocuments function:", error);

    // Optional: You might want to check error.code and error.message for more specific Firebase error types
    // https://firebase.google.com/docs/functions/callable#handle_errors_on_the_client

    // Re-throw the error or return a specific error object
    throw new Error(`Failed to call search function: ${error.message}`);
  }
};