import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Drivers from "./pages/Drivers";
import RaceData from "./pages/RaceData";
import LiveDriverPositions from "./pages/LiveDriverPositions";
import Modal from "./components/Modal";
import TeamRadio from "./pages/TeamRadio";

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Modal */}
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
            <h1>Welcome to the Formula One Pit Wall!</h1>
            <h2>Stay updated with live race data and insights.</h2>
          </div>
        </Modal>

        {/* Main App Content */}
        <Header />
        <div className="App-content-pages">
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/race-data" element={<RaceData />} />
            <Route
              path="/live-driver-positions"
              element={<LiveDriverPositions />}
            />
            <Route path="/team-radio" element={<TeamRadio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
