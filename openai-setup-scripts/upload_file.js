import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

// Initialize the OpenAI client
// It will automatically pick up the OPENAI_API_KEY environment variable
const openai = new OpenAI();

// Function to upload a single file
async function uploadFile(filePath) {
  console.log(`Attempting to upload file: ${filePath}`);
  try {
    const fileStream = fs.createReadStream(filePath);
    const response = await openai.files.create({
      file: fileStream,
      purpose: 'assistants', // Important: Use 'assistants' for File Search
    });
    console.log(`Successfully uploaded file: ${path.basename(filePath)}, File ID: ${response.id}`);
    return response.id;
  } catch (error) {
    console.error(`Error uploading file ${filePath}:`, error);
    return null;
  }
}

// --- Define the path to the FIRST document you want to upload ---
// IMPORTANT: Replace this placeholder with the actual path to one of your downloaded PDF files.
// Make sure the path is correct relative to where you run the script, or use an absolute path.
// Example for Mac/Linux: const documentPath = '/Users/patriceazi/path/to/your/downloads/document1.pdf';
// Example for Windows: const documentPath = 'C:\\Users\\patriceazi\\path\\to\\downloads\\document1.pdf';

const documentPaths = [
  '/Users/patriceazi/Desktop/Westlaw/DeMonte/gov.uscourts.ilnd.430650.1.1.pdf',
  '/Users/patriceazi/Desktop/Westlaw/DeMonte/gov.uscourts.ilnd.430650.36.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Apple Privacy/gov.uscourts.cand.403685.115.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Apple Privacy/gov.uscourts.cand.403685.138.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Floyd v. Amazon/gov.uscourts.wawd.316131.61.0_1.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Floyd v. Amazon/gov.uscourts.wawd.316131.99.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Spacetime 3D/gov.uscourts.txwd.1161904.1.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Spacetime 3D/gov.uscourts.txwd.1161904.54.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Landsheft/gov.uscourts.cand.446692.1.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Gamboa/gov.uscourts.cand.425656.24.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Gamboa/gov.uscourts.cand.425656.62.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Dib/gov.uscourts.cand.445389.1.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Mahon v. Entertainment One/gov.uscourts.cand.443762.1.0.pdf', // Note: Path adjusted slightly to match previous case name used in download folder structure
  '/Users/patriceazi/Desktop/Westlaw/Narayanan/gov.uscourts.cand.438037.1.0.pdf',
  '/Users/patriceazi/Desktop/Westlaw/Kapil/gov.uscourts.cand.441633.1.0.pdf'
];

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// Check if the placeholder path was replaced - This check will now fail correctly if path wasn't updated above
if (documentPaths.length === 0) {
  console.error("ERROR: Please add document paths to the documentPaths array in the script.");
} else {
  // Call the upload function for each document
  documentPaths.forEach(path => uploadFile(path));
}