import React from "react";
import { useState} from "react";

import './WorkSpaces.css'

export const WorkSpaces = () => {
  const [spaces, setSpaces] = useState([{latlang: [51,51],name: 'workplace' }])

  return (
    <div id='spaces'>
      <h1>Espacios de trabajo:</h1>
      <ul id='spacesList'>
        {spaces.map((space) => 
          <WorkSpace key={space.name} latlang={space.latlang} name={space.name} />
        )}
      </ul>
    </div>);
    
};

const WorkSpace = ({name, latlang }) => {
  return (
    <div id='space'>
      {name} - {latlang}
      <div id='minimap'>

      </div>
    </div>
  )
}