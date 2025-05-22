import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const paneRef = useRef<HTMLDivElement>(null);

  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (paneRef.current && !paneRef.current.contains(event.target as Node)) {
      setIsPaneOpen(false); // Close the pane if clicked outside
    }
  };

  useEffect(() => {
    if (isPaneOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPaneOpen]);

  return (
    <header className="App-header">
      <div className="App-logo-row">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg"
          alt="Formula 1 Logo"
          className="App-logo"
        />
      </div>

      <div className="App-header-row">
        <button
          className="App-nav-toggle"
          onClick={togglePane}
          aria-label="Toggle navigation pane"
        >
          ☰
        </button>
        <h1 className="App-title">Formula One Pit Wall</h1>
      </div>

      <nav
        ref={paneRef}
        className={`App-side-pane ${isPaneOpen ? "open" : ""}`}
        role="navigation"
      >
        <button
          className="App-side-pane-close"
          onClick={togglePane}
          aria-label="Close navigation pane"
        >
          ✕
        </button>
        <Link to="/" onClick={() => setIsPaneOpen(false)}>
          Home
        </Link>
        <Link to="/drivers" onClick={() => setIsPaneOpen(false)}>
          Drivers
        </Link>
        <Link to="/race-data" onClick={() => setIsPaneOpen(false)}>
          Race Data
        </Link>
        <Link to="/live-driver-positions" onClick={() => setIsPaneOpen(false)}>
          Live Driver Positions
        </Link>
        <Link to="/team-radio" onClick={() => setIsPaneOpen(false)}>
          Team Radio
        </Link>
      </nav>
    </header>
  );
};

export default Header;
