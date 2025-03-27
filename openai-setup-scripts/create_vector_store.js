import OpenAI from 'openai';

// Initialize the OpenAI client
// It will automatically pick up the OPENAI_API_KEY environment variable
const openai = new OpenAI();

// Function to create the vector store
async function createVectorStore() {
  const storeName = "LegalIQ Document Store"; // You can change this name if you like
  console.log(`Attempting to create vector store named: ${storeName}`);
  try {
    const vectorStore = await openai.vectorStores.create({
      name: storeName,
    });
    console.log(`Successfully created vector store: ${vectorStore.name}, Vector Store ID: ${vectorStore.id}`);
    console.log("\nIMPORTANT: Save this Vector Store ID! You will need it later.");
    return vectorStore.id;
  } catch (error) {
    console.error(`Error creating vector store:`, error);
    return null;
  }
}

// Run the creation function
createVectorStore();