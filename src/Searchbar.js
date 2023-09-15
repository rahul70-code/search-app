import React, { useState, useEffect } from 'react';
import './Searchbar.css'; // Import your CSS file for styling
const REACT_APP_SEARCH_LOCATIONS_URL = process.env.REACT_APP_SEARCH_LOCATIONS_URL;
function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get the user's location when the component mounts
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (query && userLocation) {
      // Replace 'YOUR_API_URL' with the actual API endpoint you want to use.
      const { latitude, longitude } = userLocation;
      fetch(`${REACT_APP_SEARCH_LOCATIONS_URL}?q=${query}&lat=${latitude}&long=${longitude}`)
        .then((response) => response.json())
        .then((data) => setResults(data))
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      setResults([]);
    }
  }, [query, userLocation]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
     
     
      <div className="results-grid">
        {results.map((result) => (
          <div key={result.id} className="result-card">
            <h3 className="result-title">{result.event_name}</h3>
            {/* Add more content here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;