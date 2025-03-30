import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

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
          {isPaneOpen ? "✕" : "☰"}
        </button>
        <h1 className="App-title">Formula One Pit Wall</h1>
      </div>

      <nav
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
      </nav>
    </header>
  );
};

export default Header;
