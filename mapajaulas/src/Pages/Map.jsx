import * as React from "react";
import { useState } from "react";

import { MapContainer, TileLayer, Popup, Marker, Circle } from "react-leaflet";

import { useMapEvents } from "react-leaflet/hooks";

import "leaflet/dist/leaflet.css";

// const PopUp = ({ where }) => {
//   const style = {
//     width: "100px",
//     height: "150px",

//     border: "2px solid green",
//     zIndex: "1000",
//   };
//   return <div style={style}>esto es un popup</div>;
// };

export const Map = () => {
  const styles = {};
  const [state, setState] = useState({
    currentLocation: { lat: -34.90648499618397, lng: -56.1904071648873 },
    zoom: "22",
  });
  const [showPopup, setShowPopup] = useState([]);

  function MyComponent() {
    const map = useMapEvents({
      click: () => {
        setShowPopup([]);
        console.log(map, showPopup);
      },
      locationfound: (location) => {
        console.log("location found:", location);
      },
      contextmenu: (location) => {
        
        setShowPopup([location.latlng.lat, location.latlng.lng]);
      },
    });
    console.log(map);
    return null;
  }

  const onClick = (event) => {
    console.log("daleeeee", event);
  };

  return (
    <div id="map">
      <MapContainer
        id="mapContainer"
        center={state.currentLocation}
        zoom={state.zoom}
        minZoom={2}
        style={{ position: "relative" }}
      >
        <MyComponent />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {showPopup.length > 0 ? (
          <Circle
            center={showPopup}
            redius={200}
            eventHandlers={{
              click: onClick,
            }}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Circle>
        ) : (
          ""
        )}
      </MapContainer>
    </div>
  );
};
