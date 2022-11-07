import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Map } from "./Pages/Map";
import { Nav } from "./Components/Nav";
import { Home } from "./Pages/Home";
import { WorkSpaces } from "./Pages/WorkSpaces";
import { Login } from "./Pages/Login";
import  FistPage  from "./Pages/FirstPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div id="App">
      {token ? <Nav setToken={setToken} /> : ""}
      <Routes>
        <Route path="/" element={<FistPage token={token} />} />
        <Route path="/Login" element={<Login setToken={setToken} />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/workspaces" element={<WorkSpaces />} />
      </Routes>
    </div>
  );
}

export default App;
