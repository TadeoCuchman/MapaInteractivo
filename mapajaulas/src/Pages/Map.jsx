import * as React from "react";
import { useState } from "react";

import { MapContainer, TileLayer, Popup, Marker, Circle } from "react-leaflet";

import { useMapEvents } from "react-leaflet/hooks";

import './Map.css';
import "leaflet/dist/leaflet.css";


export const Map = () => {
  const [state, setState] = useState({
    currentLocation: { lat: -34.90648499618397, lng: -56.1904071648873 },
    zoom: "22",
  });

  const [zoneBool, setZoneBool] = useState(false)
  const [zone, setZone] = useState([]);
  const [createPolygon, setCreatePolygon] = useState(false);
  const [color, setColor] = useState('red');
  const [markerTextPopup, setMarkerTextPopup] = useState(false);
  const [markerTextSumbit, setMarkerTextSumbit] = useState(false);
  const [markerTextInput, setMarkerTextInput] = useState('');
  const [newWorkSpace, setNewWorkSpace] = useState(false);
  
  function MyComponent() {
    const map = useMapEvents({
      
      click: (event) => {
        if (newWorkSpace) {
          
        }
        if (
          (event.containerPoint.x > 370 || event.containerPoint.x < 0) ||
          (event.containerPoint.y > 60 || event.containerPoint.y < 0)
          ) {
          setZone([...zone, event.latlng]);
          console.log(zone)
          if (markerTextSumbit) {
            console.log(zone);
            const circle = L.circle(zone[0], { radius: 5 }).addTo(map);
            if (markerTextInput) {
              circle.bindTooltip(markerTextInput).openTooltip();
            }
            document.getElementById("mapContainer").click();
            setMarkerTextSumbit(false)
            setMarkerTextPopup(false)
            setZone([]);
          }
          if (zoneBool) {
            L.polyline(zone, { color: color }).addTo(map);
            if (createPolygon) {
              L.polygon(zone, { color: color }).addTo(map);
              setZoneBool(false);
              setCreatePolygon(false);
            }
          }

        }
      },

      locationfound: (location) => {
        console.log("location found:", location);
      },

      contextmenu: (event) => {
        setZone([event.latlng]);
        console.log(zone)
        L.popup({ closeButton: false })
          .setLatLng(event.latlng)
          .setContent(
            zoneBool
              ? "Marcar puntos de la zona"
              : 
            `<button id='markZone'> Marcar Zona </button>
            <button id='markPoint'> Marcar Punto </button></br></br>
            <button id='newWorkSpace'>Definir nuevo espacio de trabajo </button>
            `
          )
          .openOn(map);
        console.log(document.getElementById("markZone"))
        document.getElementById("markZone").addEventListener("click", () => {
          setZoneBool(true)
        })

        document.getElementById("markPoint").addEventListener("click", () => {
          setMarkerTextPopup(true);
          document.getElementById("mapContainer").click();
        });
        

        document.getElementById("newWorkSpace").addEventListener("click", () => {
            setNewWorkSpace(true);
            document.getElementById("mapContainer").click();
          });
        
      }
      
    });

    return null;
  }





  return (
    <div id="map">
      <MapContainer
        id="mapContainer"
        center={state.currentLocation}
        zoom={state.zoom}
        minZoom={2}
        style={{ position: "relative" }}
      >
        <div id="controls">
          {zoneBool ? (
            <>
              <button
                onClick={() => {
                  setZoneBool(false);
                  setCreatePolygon(false);
                  window.location.reload(false);
                }}
              >
                Cancelar Marco
              </button>
              <button
                onClick={() => {
                  setCreatePolygon(true);
                  setTimeout(
                    () => document.getElementById("mapContainer").click(),
                    500
                  );
                }}
              >
                Terminar Marco
              </button>
              <ColorControls setColor={setColor} color={color} />
            </>
          ) : (
            ""
          )}
          {markerTextPopup ? (
            <>
              <span>Nota</span>
              <input
                type="text"
                id="markerTextPopup"
                onChange={(event) => setMarkerTextInput(event.target.value)}
                ></input>
              <button
                onClick={() => {
                  setMarkerTextPopup(false)
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setMarkerTextPopup(false);
                  setMarkerTextSumbit(true);
                  setTimeout(
                    () => document.getElementById("mapContainer").click(),
                    500
                  );
                }}
              >
                Crear
              </button>
            </>
          ) : (
            ""
          )}
        </div>
        <MyComponent />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

const ColorControls = ({ setColor, color }) => {
  const colors = ['red', 'green', 'blue'];


  return (
    <div id="colorControl">
      <ul>
        {colors.map((col) => {
          return (
            <li
              className= "selected" 
              style={{ backgroundColor: `${col}` }}
              key={col}
              onClick={() => setColor(col)}
            >
              {col}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

