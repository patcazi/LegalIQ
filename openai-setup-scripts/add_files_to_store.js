import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI();

// --- Configuration ---
// !!! IMPORTANT: Paste the Vector Store ID you saved earlier here !!!
const VECTOR_STORE_ID = 'vs_67e4a78347d48191b91380ecf879f687'; // <-- Make sure this ID is correct

// !!! IMPORTANT: Paste the list of 15 File IDs you saved earlier here !!!
const FILE_IDS = [
  'file-VGf66K5AgnSX1kyVxP4DUF',
  'file-XvKxhMzoj32Ri8kYgmkfzq',
  'file-5RxdKyVjJ9hSdR2AQGckoW',
  'file-GPWvVsQaCAeXhnCWzPzPvy',
  'file-Rri7V2jiSePgsf1sNjTQyQ',
  'file-HxKbCNQhYpqADNs6bFsDLU',
  'file-1GE9zBQbDqntsnAH2kvMT4',
  'file-PK3yaeN1Eey5s1fD6hQjCh',
  'file-VLEQ34PdnsZdQKC36cft5K',
  'file-LwEZ8WCYyfcKK5p1KoNkPN',
  'file-H451oPCG9h66AB3G9PTnme',
  'file-Rn8Vh8w5fz15CjsiVJFZT5',
  'file-RinnVP6dGYTXEypZr8dNiB',
  'file-PKBktAva63EGg8w5iThvsJ',
  'file-Tebk9c8XwemhCodzaZPPeH'
  // Add more file IDs here if needed in the future
];
// --- --- --- -------- ---

// Function to add a single file to the vector store
async function addFileToVectorStore(vectorStoreId, fileId) {
  console.log(`Attempting to add File ID: ${fileId} to Vector Store ID: ${vectorStoreId}`);
  try {
    const response = await openai.vectorStores.files.create(vectorStoreId, {
      file_id: fileId,
    });
    console.log(`Successfully added File ID: ${fileId}, Status: ${response.status}`);
    return response;
  } catch (error) {
    console.error(`Error adding File ID ${fileId} to store ${vectorStoreId}:`, error);
    return null;
  }
}

// Main function to add all files to the store
async function addAllFiles() {
  if (!VECTOR_STORE_ID || !VECTOR_STORE_ID.startsWith('vs_')) {
      console.error("ERROR: Please set the correct VECTOR_STORE_ID constant in the script.");
      return;
  }
   if (FILE_IDS.length === 0 || !FILE_IDS[0].startsWith('file-')) {
      console.error("ERROR: Please add the correct File IDs to the FILE_IDS array in the script.");
      return;
  }

  console.log(`Starting process to add ${FILE_IDS.length} files to vector store ${VECTOR_STORE_ID}...`);
  let successCount = 0;

  for (const fileId of FILE_IDS) {
    const result = await addFileToVectorStore(VECTOR_STORE_ID, fileId);
    if (result) {
        successCount++;
    }
    // Optional: Add a small delay if you encounter rate limits, although usually not needed here.
    // await new Promise(resolve => setTimeout(resolve, 200)); // 200ms delay
  }

  console.log("\n--- Add Files Summary ---");
  console.log(`Attempted to add ${FILE_IDS.length} files.`);
  console.log(`Successfully added ${successCount} files to vector store ${VECTOR_STORE_ID}.`);
  console.log("------------------------\n");
  console.log("File processing within the vector store will now happen in the background.");
}

// Run the process
addAllFiles();