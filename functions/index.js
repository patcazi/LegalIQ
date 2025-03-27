/* eslint-env node */
// Import necessary Firebase and OpenAI modules
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const OpenAI = require("openai");
const cors = require('cors')({ origin: true }); // For handling web app calls

// --- Configuration ---
// We will set the OpenAI API Key securely using Firebase function configuration later
// const OPENAI_API_KEY = functions.config().openai.key; // Example of how we'll access it

// Your Vector Store ID from the previous setup steps
const VECTOR_STORE_ID = 'vs_67e4a78347d48191b91380ecf879f687'; // Make sure this is correct

// --- The Cloud Function ---
exports.searchDocuments = onCall({
    // Secrets configuration - Tells Firebase to inject the OPENAI_API_KEY secret
    // We will set this secret value in the next step using the Firebase CLI
    secrets: ["OPENAI_API_KEY"],
    // Allow requests from authenticated users or specify other options if needed
    // enforceAppCheck: false, // Use only for testing if needed, remove for production
    // consumeAppCheckToken: false, // Use only for testing if needed, remove for production
}, async (request) => {
    // Note: Using onCall automatically handles CORS for requests from your Firebase app
    // If calling from elsewhere or needing fine-grained control, manual CORS handling might be needed.

    // Get the search query from the data sent by the frontend
    const query = request.data.query;
    logger.info(`Received search query: ${query}`);

    if (!query) {
        logger.error("No query provided in the request data.");
        // Throwing an error using functions.https.HttpsError is standard for onCall functions
        throw new HttpsError('invalid-argument', 'The function must be called with one argument "query".');
    }

    // Retrieve the OpenAI API Key from the configured secrets
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        logger.error("OpenAI API Key secret is not configured correctly.");
        throw new HttpsError('internal', 'Server configuration error.');
    }

    // Initialize OpenAI client *inside* the function
    logger.info("API Key status:", apiKey ? "Key Found (length " + apiKey.length + ")" : "Key NOT Found!");
    const openai = new OpenAI({ apiKey });

    try {
        logger.info(`Calling OpenAI Responses API with query: "${query}" for vector store: ${VECTOR_STORE_ID}`);

        // Call the OpenAI Responses API with the file_search tool
        const response = await openai.responses.create({
            model: "gpt-4o-mini", // Or another suitable model
            input: query,
            tools: [{
                type: "file_search",
                vector_store_ids: [VECTOR_STORE_ID]
            }],
            // Optionally include search results if needed for debugging or advanced display
            // include: ["file_search_call.results"]
        });

        logger.info("Successfully received response from OpenAI.");

        // Process the response (you might want to refine this)
        // For now, just return the raw output array from OpenAI
        const output = response.output;

        // Return the results back to the frontend caller
        return { success: true, data: output };

    } catch (error) {
        logger.error("Error calling OpenAI API:", error);
        throw new HttpsError('internal', 'Failed to call OpenAI API.', error.message);
    }
});