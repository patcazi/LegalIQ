// src/components/SearchComponent.jsx
import React, { useState } from 'react';
import { callSearchDocuments } from '../services/searchService'; // Import the service function

function SearchComponent() {
  const [query, setQuery] = useState(''); // State for the search input
  const [results, setResults] = useState(null); // State for the search results
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages

  // Handler for when the search button is clicked
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null); // Clear previous results

    try {
      const openAIResponseData = await callSearchDocuments(query);
      console.log("SearchComponent received data:", openAIResponseData);
      // The data likely contains an array of outputs, one of which is the message
      // Find the message output item
      const messageOutput = openAIResponseData?.find(item => item.type === 'message');
      setResults(messageOutput); // Store the relevant part of the response

    } catch (err) {
      console.error("SearchComponent error:", err);
      setError(err.message || "An error occurred during the search.");
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  // Handler for input field changes
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Handler for pressing Enter in the input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2>Search Documents</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter search query..."
        disabled={isLoading}
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>

      {/* Display Loading Indicator */}
      {isLoading && <p>Loading results...</p>}

      {/* Display Error Message */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display Results */}
      {results && results.content && (
        <div>
          <h3>Results:</h3>
          {(() => {
            const textOutput = results.content.find(item => item.type === 'output_text');
            if (textOutput && textOutput.text) {
              return (
                <div>
                  <p>{textOutput.text}</p>
                  {textOutput.annotations && textOutput.annotations.length > 0 && (
                    <div>
                      <h4>Sources:</h4>
                      <ul>
                        {textOutput.annotations
                          .filter(annotation => annotation.type === 'file_citation')
                          .map((annotation, index) => (
                            <li key={index}>Source: {annotation.filename}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })()}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;