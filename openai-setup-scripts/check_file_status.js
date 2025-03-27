import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI();

// --- Configuration ---
// !!! IMPORTANT: Paste the Vector Store ID you saved earlier here !!!
const VECTOR_STORE_ID = 'vs_67e4a78347d48191b91380ecf879f687'; // <-- Make sure this ID is correct
// --- --- --- -------- ---

// Function to check the status of files in the vector store
async function checkFileStatuses(vectorStoreId) {
  console.log(`Checking file statuses in vector store: ${vectorStoreId}`);
  try {
    const response = await openai.vectorStores.files.list(vectorStoreId);
    const files = response.data; // The list of file objects

    if (!files || files.length === 0) {
      console.log("No files found in the vector store yet.");
      return;
    }

    console.log(`\n--- File Status Report (Vector Store: ${vectorStoreId}) ---`);
    let completedCount = 0;
    let inProgressCount = 0;
    let failedCount = 0;

    files.forEach(file => {
      console.log(`- File ID: ${file.id}, Status: ${file.status}`);
      if (file.status === 'completed') {
        completedCount++;
      } else if (file.status === 'in_progress') {
        inProgressCount++;
      } else {
        failedCount++; // Includes 'failed', 'cancelled'
      }
    });

    console.log("\n--- Summary ---");
    console.log(`Total files listed: ${files.length}`);
    console.log(`Completed: ${completedCount}`);
    console.log(`In Progress: ${inProgressCount}`);
    if (failedCount > 0) {
        console.log(`Failed/Other: ${failedCount}`);
    }
    console.log("---------------\n");

    if (inProgressCount === 0 && failedCount === 0 && files.length > 0) {
      console.log("All files have been processed successfully!");
    } else if (inProgressCount > 0) {
      console.log("Some files are still processing. Please wait and check again later.");
    } else if (failedCount > 0) {
       console.log("Some files failed to process. Check the statuses above.");
    }

  } catch (error) {
    console.error(`Error checking file statuses for store ${vectorStoreId}:`, error);
  }
}

// Run the check function
checkFileStatuses(VECTOR_STORE_ID);