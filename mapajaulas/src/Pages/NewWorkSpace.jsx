import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const NewWorkSpace = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const styles = {
    styles: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      AlignItems: "center",
      marginBottom: "10px",
    },
    error: {
      backgroundColor: "red",
      width: "50%",
      height: "30px",
      borderRadius: "10px",
      textAlign: "center",
      fontSize: "17px",
      position: "absolute",
      top: "120px",
    },
    success: {
      backgroundColor: "green",
      width: "50%",
      height: "30px",
      borderRadius: "10px",
      textAlign: "center",
      fontSize: "17px",
      position: "absolute",
      top: "120px",
    },
  };
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newWorkSpace, setNewWorkSpace] = useState({
    name: "",
    latlang: JSON.stringify(location.state.latlang),
    created_date: new Date().toJSON().slice(0, 10),
    private: false,
    description: "",
  });

  function createWorkspace(workspace) {
    console.log("dasd", workspace);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(workspace),
    };

    fetch("http://localhost:3200/location/newWorkspace", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success);
        if (!response.success) {
          setError(response.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        } else {
          setSuccess(response.message);
          setTimeout(() => {
            setSuccess(null);
            navigate("/Workspaces");
          }, 3000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleSubmit = (event) => {
    console.log(newWorkSpace);
    createWorkspace(newWorkSpace);
  };

  return (
    <div style={styles.styles}>
      {error ? <div style={styles.error}>{`${error}`}</div> : ""}
      {success ? <div style={styles.success}>{`${success}`}</div> : ""}

      <form onSubmit={(event) => event.preventDefault()}>
        <h3>Nombre del Espacio de trabajo:</h3>
        <p>Coordenadas: {`${newWorkSpace.latlang}`}</p>
        <p>Fecha: {`${newWorkSpace.created_date}`}</p>
        <p>Nombre:</p>
        <input
          style={{ width: "100%" }}
          type="text"
          placeholder="Nombre del Espacio de trabajo"
          onChange={(event) => {
            setNewWorkSpace({ ...newWorkSpace, name: event.target.value });
          }}
        />
        <br />
        <br />
        <span>Privado:</span>
        <input
          type="checkbox"
          onChange={(event) =>
            setNewWorkSpace({ ...newWorkSpace, private: event.target.checked })
          }
        />
        <p>Descripción:</p>
        <textarea
          onChange={(event) => {
            setNewWorkSpace({
              ...newWorkSpace,
              description: event.target.value,
            });
            console.log(newWorkSpace);
          }}
        ></textarea>
        <br />
        <br />
        <button type="submit" onClick={() => handleSubmit()}>
          Ingresar
        </button>
      </form>
    </div>
  );
};
