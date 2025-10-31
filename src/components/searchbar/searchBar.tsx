import { useState, useEffect } from "react";
import "./searchBar.css";
import SearchContent from "./searchContent";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiButtonClicked, setAiButtonClicked] = useState(false);

  useEffect(() => {}, [searchInput]);

  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setIsTyping(value.trim() !== "");

    setSearchInput(value);
  };

  useEffect(() => {
    const inputElement = document.getElementById("searchInput");
    if (!isTyping && aiButtonClicked) {
      setAiButtonClicked(false);
    }
    function setDefaultStyle() {
      if (!inputElement) return;
      inputElement.style.border = "2px solid var(--color-accent)";
      inputElement.style.backgroundImage = "none";
      inputElement.style.backgroundOrigin = "";
      inputElement.style.backgroundClip = "";
      inputElement.style.transition = "all 0.3s ease";
    }
    if (isTyping) {
      if (inputElement) {
        inputElement.style.paddingLeft = "2vh";
        if (aiButtonClicked) {
          inputElement.style.border = "2px solid transparent";
          inputElement.style.backgroundImage =
            "linear-gradient(var(--color-secondary), var(--color-secondary)), var(--color-gemini)";
          inputElement.style.backgroundOrigin = "border-box";
          inputElement.style.backgroundClip = "padding-box, border-box";
          inputElement.style.transition = "all 0.3s ease";
        } else {
          setDefaultStyle();
        }
      }
    } else {
      if (inputElement) {
        inputElement.style.paddingLeft = "6vh";
        setDefaultStyle();
      }
    }
  }, [isTyping, aiButtonClicked]);

  return (
    <div className="search-bar-container">
      {!isTyping && <i className="fas fa-search search-icon"></i>}
      <input
        type="text"
        className={aiButtonClicked ? "search-input active" : "search-input"}
        placeholder="Search..."
        autoComplete="off"
        onClick={() => setIsTyping(true)}
        onChange={handleChange}
        id="searchInput"
      />
      {isTyping && (
        <>
          <img
            src="/gemini-logo.png"
            alt=""
            id="gemini-logo"
            onClick={() => {
              if (aiButtonClicked) setAiButtonClicked(false);
              else setAiButtonClicked(true);
            }}
          />
          <i
            className="fas fa-times close-icon"
            onClick={() => setIsTyping(false)}
          />
        </>
      )}
      {isTyping && <SearchContent />}
    </div>
  );
}

export default SearchBar;
