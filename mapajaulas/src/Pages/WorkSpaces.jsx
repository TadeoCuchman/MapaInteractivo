import React from "react";
import { useState, useEffect } from "react";

import "./WorkSpaces.css";

export const WorkSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    getWorkSpaces();
  }, []);

  function getWorkSpaces() {
    const options = {
      method: "GET",
      headers: { "auth-token": localStorage.getItem("token") },
    };

    fetch("http://localhost:3200/location/workspaces", options)
      .then((response) => response.json())
      .then((response) => setSpaces(response.result))
      .catch((err) => console.error(err));
  }

  return (
    <div id="spaces">
      <h1>Espacios de trabajo:</h1>
      <ul id="spacesList">
        {spaces.map((space) => (
          <WorkSpace key={space.id} latlang={space.latlang} name={space.name} />
        ))}
      </ul>
    </div>
  );
};

const WorkSpace = ({ name, latlang }) => {
  return (
    <div id="space">
      {name} - {latlang}
      <div id="minimap"></div>
    </div>
  );
};
