import { useState, useEffect, use } from "react";
import "./searchBar.css";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {}, [searchInput]);

  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setIsTyping(value.trim() !== "");

    setSearchInput(value);
  };

  useEffect(() => {
    const inputElement = document.getElementById("searchInput");
    if (isTyping) {
      if (inputElement) {
        inputElement.style.paddingLeft = "2vh";
      }
    } else {
      if (inputElement) {
        inputElement.style.paddingLeft = "6vh";
      }
    }
  }, [isTyping]);

  return (
    <div className="search-bar-container">
      {!isTyping && <i className="fas fa-search search-icon"></i>}
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        autoComplete="off"
        onClick={() => setIsTyping(true)}
        onChange={handleChange}
        id="searchInput"
      />
    </div>
  );
}

export default SearchBar;
