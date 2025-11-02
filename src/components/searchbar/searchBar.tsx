import { useState, useEffect, useRef } from "react";
import "./searchBar.css";
import SearchContent from "./searchContent";
import { Umkm } from "../../models/Umkm";

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

  //clear elementinput
  function clearInput() {
    const input = document.getElementById(
      "searchInput"
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  }

  //fetchn data for ai mode input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const inputElement = document.getElementById(
        "searchInput"
      ) as HTMLInputElement | null;
      if (!inputElement) return;
      if (event.key === "Enter") {
        const value = inputElement.value;
        setSearchInput(value);
        setFirstTime(false);
        event.preventDefault();
        const fetchAiResults = async () => {
          setLoading(true);
          try {
            const response = await fetch(
              `${backendUrl}/search/by/query?query=${encodeURIComponent(value)}`
            );
            if (response.ok) {
              const data = await response.json();
              console.log("AI search result:", data);

              const umkmList = data.data.map((umkm: any) =>
                Umkm.fromJSON(umkm)
              );
              setSearchResults(umkmList);
            }
          } catch (error) {
            console.error("Error fetching AI results:", error);
          } finally {
            clearInput();
            setLoading(false);
          }
        };
        fetchAiResults();
      }
    };

    if (aiButtonClicked) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [aiButtonClicked]);

  //fetch data for normal mode input
  useEffect(() => {
    if (searchInput === "") return;
    if (isTyping) {
      if (!aiButtonClicked) {
        setLoading(true);
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${backendUrl}/search/by/keyword?keyword=${searchInput}`
            );

            if (response.ok) {
              const data = await response.json();

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
    if (!aiButtonClicked) {
      const value = e.target.value;
      setQuery(value);
      setIsTyping(value.trim() !== "");
    }
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

  //clear cache saat ilang first time
  useEffect(() => {
    if (firstTime) {
      setQuery("");
      setSearchInput("");
      setSearchResults([]);
    }
  }, [firstTime]);

  //set first time on exit
  useEffect(() => {
    if (!isTyping) {
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
    }

    function setOnActiveStyle() {
      if (!inputElement) return;
      inputElement.style.border = "2px solid transparent";
      inputElement.style.backgroundImage =
        "linear-gradient(var(--color-secondary), var(--color-secondary)), var(--color-gemini)";
      inputElement.style.backgroundOrigin = "border-box";
      inputElement.style.backgroundClip = "padding-box, border-box";
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
