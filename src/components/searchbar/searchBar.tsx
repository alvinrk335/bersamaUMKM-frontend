import { useState, useEffect, useRef } from "react";
import "./searchBar.css";
import SearchContent from "./searchContent";
import { Umkm } from "../../models/umkmModel";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiButtonClicked, setAiButtonClicked] = useState(false);
  const [searchResults, setSearchResults] = useState<Umkm[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

  const containerRef = useRef<HTMLDivElement>(null);

  //fetch data for input
  useEffect(() => {
    setLoading(true);
    if (searchInput === "") return;
    if (isTyping) {
      if (aiButtonClicked) {
      } else {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${backendUrl}/search/by/keyword?keyword=${searchInput}`
            );

            if (response.ok) {
              const data = await response.json();
              console.log("fetched data:", data);

              const umkmList = data.umkms.map((umkm: any) =>
                Umkm.fromJSON(umkm)
              );
              setSearchResults(umkmList);
            } else if (response.status === 404) {
              setSearchResults([]);
            }
          } catch (error) {
            console.error("Error fetching search results:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }
    }
  }, [searchInput]);

  //change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstTime(false);
    const value = e.target.value;
    setQuery(value);
    setIsTyping(value.trim() !== "");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchInput(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  //close search bar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsTyping(false);
        setAiButtonClicked(false);
        setFirstTime(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //styling for ai button clicked
  useEffect(() => {
    const inputElement = document.getElementById("searchInput");
    if (!inputElement) return;
    if (aiButtonClicked) {
      inputElement.classList.add("active");
    } else {
      inputElement.classList.remove("active");
    }
  }, [aiButtonClicked]);


  //set first time on exit
  useEffect(() => {
    if(!isTyping){
      setFirstTime(true);
    }
  }, [isTyping]);


  //styling for typing state
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

    function setOnActiveStyle() {
      if (!inputElement) return;
      inputElement.style.border = "2px solid transparent";
      inputElement.style.backgroundImage =
        "linear-gradient(var(--color-secondary), var(--color-secondary)), var(--color-gemini)";
      inputElement.style.backgroundOrigin = "border-box";
      inputElement.style.backgroundClip = "padding-box, border-box";

      inputElement.style.transition = "all 0.3s ease";
    }

    if (isTyping) {
      if (inputElement) {
        inputElement.style.paddingLeft = "2vh";
        if (aiButtonClicked) {
          setOnActiveStyle();
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
    <div
      className={"search-bar-container" + (aiButtonClicked ? " ai-active" : "")}
      ref={containerRef}
    >
      {!isTyping && <i className="fas fa-search search-icon"></i>}
      <input
        type="text"
        className={aiButtonClicked ? "search-input active" : "search-input"}
        placeholder="Search..."
        autoComplete="off"
        onClick={() => {
          setIsTyping(true);
        }}
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
      {isTyping && (
        <SearchContent
          data={searchResults}
          dataType="umkm"
          searchType={aiButtonClicked ? "ai" : "normal"}
          loading={loading}
          firstTime={firstTime}
        />
      )}
    </div>
  );
}

export default SearchBar;
