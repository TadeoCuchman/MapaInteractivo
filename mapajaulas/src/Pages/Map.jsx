import * as React from "react";
import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Polygon,
  Circle,
  Tooltip,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useMapEvents } from "react-leaflet/hooks";

import "./Map.css";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    currentLocation: { lat: -34.90737286434041, lng: -56.192724108695984 },
    zoom: "22",
  });
  const [lines, setLines] = useState([]);
  const [polygones, setPolygones] = useState([]);
  const [circles, setCircles] = useState([]);

  const [zoneBool, setZoneBool] = useState(false);
  const [zone, setZone] = useState([]);
  const [createPolygon, setCreatePolygon] = useState(false);
  const [color, setColor] = useState("red");
  const [markerTextPopup, setMarkerTextPopup] = useState(false);
  const [markerTextSumbit, setMarkerTextSumbit] = useState(false);
  const [markerTextInput, setMarkerTextInput] = useState("");
  const [newWorkSpace, setNewWorkSpace] = useState(false);

  function MyComponent() {
    const map = useMapEvents({
      click: (event) => {
        console.log(event);
        if (newWorkSpace) {
          navigate("/NewWorkSpace", { state: { latlang: event.latlng } });
        }
        if (
          event.containerPoint.x > 550 ||
          event.containerPoint.x < 0 ||
          event.containerPoint.y > 60 ||
          event.containerPoint.y < 0
        ) {
          setZone([...zone, event.latlng]);
          if (markerTextSumbit) {
            const newCircle = {
              latlang: zone[0],
              color: color,
              text: markerTextInput,
            };
            setCircles([...circles, newCircle]);
            //post del circulo
            setMarkerTextSumbit(false);
            setMarkerTextPopup(false);
            setZone([]);
          }
          if (zoneBool) {
            setLines([...lines, { latlangs: zone, color: color }]);
            if (createPolygon) {
              const newPolygon = {
                latlangs: zone,
                color: color,
                text: markerTextInput,
              };
              setPolygones([...polygones, newPolygon]);
              //post del poligono
              setMarkerTextPopup(false);
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
        console.log(zone);
        L.popup({ closeButton: false })
          .setLatLng(event.latlng)
          .setContent(
            zoneBool || markerTextPopup
              ? "Marcar punto de la zona"
              : `
                <button id='markZone'> Marcar Zona </button>
                <button id='markPoint'> Marcar Punto </button></br></br>
                `
          )
          .openOn(map);

        document
          .getElementById("markZone")
          .addEventListener("click", (event) => {
            setZoneBool(true);
            setMarkerTextSumbit(false);
          });

        document.getElementById("markPoint").addEventListener("click", () => {
          setMarkerTextPopup(true);
          setZoneBool(false);
          document.getElementById("mapContainer").click();
        });
      },
    });

    return null;
  }

  return (
    <div id="map">
      <button
        id="newWorkSpace"
        onClick={() => {
          setNewWorkSpace(true);
          document.getElementById("mapContainer").click();
        }}
      >
        Definir nuevo espacio de trabajo{" "}
      </button>
      <MapContainer
        id="mapContainer"
        center={state.currentLocation}
        zoom={state.zoom}
        minZoom={2}
        style={{ position: "relative" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />
        <div id="controls">
          {/* menu del Marco */}
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
              <NotesControls setMarkerTextInput={setMarkerTextInput} />
              <ColorControls setColor={setColor} color={color} />
            </>
          ) : (
            ""
          )}

          {/* menu de punto  */}
          {markerTextPopup ? (
            <>
              <NotesControls setMarkerTextInput={setMarkerTextInput} />
              <ColorControls setColor={setColor} color={color} />
              <button
                onClick={() => {
                  setMarkerTextPopup(false);
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

        {/* Renderers de diferentes utilidades  */}
        {circles.map((circle) => {
          return (
            <Circle
              center={circle.latlang}
              pathOptions={{ color: circle.color }}
              radius={5}
            >
              {circle.text ? <Tooltip>{circle.text}</Tooltip> : ""}
            </Circle>
          );
        })}

        {polygones.map((polygon) => {
          return (
            <Polygon
              positions={polygon.latlangs}
              pathOptions={{ color: polygon.color }}
            >
              {polygon.text ? <Tooltip>{polygon.text}</Tooltip> : ""}
            </Polygon>
          );
        })}

        {lines.map((line) => {
          return (
            <Polyline
              positions={line.latlangs}
              pathOptions={{ color: line.color }}
            ></Polyline>
          );
        })}
      </MapContainer>
    </div>
  );
};

const ColorControls = ({ setColor, color }) => {
  const colors = ["red", "green", "blue"];

  return (
    <div id="colorControl">
      <ul>
        {colors.map((col) => {
          return (
            <li
              style={
                col == color
                  ? { backgroundColor: `${col}`, border: "1px dashed white" }
                  : { backgroundColor: `${col}` }
              }
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
};

const NotesControls = ({ setMarkerTextInput }) => {
  return (
    <>
      <span>Nota</span>
      <input
        type="text"
        id="markerTextPopup"
        onChange={(event) => setMarkerTextInput(event.target.value)}
      ></input>
    </>
  );
};
