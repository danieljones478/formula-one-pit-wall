import React, { useState } from "react";
import "./App.css";
import NextRaceCard from "./components/NextRaceCard";
import Modal from "./components/Modal";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <header className="App-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg"
            alt="Formula 1 Logo"
            className="App-logo"
          />
          <h1 className="App-title">Formula One Pit Wall</h1>
        </header>
        <div className="App-content">
          <p>Welcome to the Formula One Pit Wall!</p>
          <p>Stay updated with live race data and insights.</p>
          <NextRaceCard />
        </div>
      </Modal>
      {!isModalVisible && (
        <div className="App-home">
          <header className="App-header">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg"
              alt="Formula 1 Logo"
              className="App-logo"
            />
            <h1 className="App-title">Formula One Pit Wall</h1>
          </header>
        </div>
      )}
    </div>
  );
}

export default App;
