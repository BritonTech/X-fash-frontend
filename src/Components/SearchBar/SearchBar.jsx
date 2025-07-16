// import React, { useState, useEffect } from 'react';
// import './SearchBar.css'; // create this if you want custom styles
// import { assets } from '../../Assets/assets';

// const SearchBar = ({ allProducts, onSearchResults }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   // Debounced search handler
//   useEffect(() => {
//     const delaySearch = setTimeout(() => {
//       if (searchTerm.trim() === "") {
//         onSearchResults(null);
//         setSuggestions([]);
//       } else {
//         const matches = allProducts.filter(p =>
//           p.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         onSearchResults(matches);

//         const suggestionNames = matches.map(p => p.name);
//         setSuggestions([...new Set(suggestionNames)].slice(0, 5));
//       }
//     }, 400); // debounce delay (400ms)

//     return () => clearTimeout(delaySearch); // cleanup
//   }, [searchTerm, allProducts, onSearchResults]);

//   return (
//     <div style={{ position: "relative" }}>
//       <input
//         type="text"
//         className="search-input"
//         placeholder="Search for your perfect products here..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === 'Escape') {
//             setSearchTerm('');
//             setSuggestions([]);
//             onSearchResults(null);
//           }
//         }}
//       />
//       <img
//         src={assets.search}
//         alt="search"
//         className="search-icon"
//         onClick={() => {
//           const matches = allProducts.filter(p =>
//             p.name.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//           onSearchResults(matches);
//         }}
//         style={{ cursor: "pointer" }}
//       />

//       {suggestions.length > 0 && (
//         <ul className="suggestion-box">
//           {suggestions.map((name, index) => (
//             <li key={index} onClick={() => {
//               setSearchTerm(name);
//               setSuggestions([]);
//               const match = allProducts.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
//               onSearchResults(match);
//             }}>
//               {name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

// SearchBar.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import { assets } from "../../Assets/assets";
import "./SearchBar.css";

import { StoreContext } from "../../Context/StoreContext";

const SearchBar = ({ allProducts, onSearchResults, clearSignal }) => {
  const inputRef = useRef();
  const [query, setQuery] = useState("");
  const { all_product } = useContext(StoreContext);


  const [displayText, setDisplayText] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentHints, setCurrentHints] = useState([]);


  // 1. Extract product names grouped by category
  useEffect(() => {
    if (Array.isArray(all_product)) {
      const grouped = {};

      all_product.forEach((p) => {
        if (!grouped[p.category]) {
          grouped[p.category] = [];
        }
        grouped[p.category].push(p.name || p.title);
      });

      // Flatten all names grouped by category (change logic if you want only "Womens", etc.)
      const allHints = Object.values(grouped).flat();
      setCurrentHints(allHints);
    }
  }, [all_product]);

  // 2. Typing effect
  useEffect(() => {
    if (currentHints.length === 0) return;

    const fullText = `Search for: ${currentHints[hintIndex]}`;
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100); // typing speed
      return () => clearTimeout(timeout);
    } else {
      // Wait before switching to next
      const pause = setTimeout(() => {
        setCharIndex(0);
        setDisplayText('');
        setHintIndex((prev) => (prev + 1) % currentHints.length);
      }, 2000); // pause time after full sentence
      return () => clearTimeout(pause);
    }
  }, [charIndex, hintIndex, currentHints]);



  useEffect(() => {
    if (clearSignal) {
      setQuery("");
      onSearchResults(null); // Reset search results
    }
  }, [clearSignal]);

  useEffect(() => {
    if (!query) {
      onSearchResults(null);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    onSearchResults(filtered);
  }, [query]);

  return (
    <div className="search-bar-wrapper">
      <input
        ref={inputRef}
        type="text"
        // placeholder="Search for your perfect products here..."
        placeholder={displayText}
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <img src={assets.search} className="search-icon" alt="Search" />
      {/* {query && (
        <button
          className="clear-search-btn"
          onClick={() => setQuery("")}
          title="Clear search"
        >
          ❌
        </button>
      )} */}
    </div>
  );
};

export default SearchBar;
