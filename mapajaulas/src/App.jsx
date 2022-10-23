import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Map } from "./Pages/Map";
import { Nav } from "./Components/Nav";
import { Home } from "./Pages/Home";
import { WorkSpaces } from "./Pages/WorkSpaces";

function App() {
  return (
    <div id="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/workspaces" element={<WorkSpaces />} />
      </Routes>
    </div>
  );
}

export default App;
