import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Nav = ({ setToken }) => {
  let navigate = useNavigate();

  return (
    <nav>
      <img src="/mundo.jpeg" alt="" />
      <ul>
        <li>
          <Link to={"/Inicio"}>Inicio</Link>
        </li>
        <li>
          <Link to={"/map"}>Mapa</Link>
        </li>
        <li>
          <Link to={"/workspaces"}>Agregar espacio de trabajo</Link>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
              navigate("/");
            }}
          >
            LogOut
          </button>
        </li>
      </ul>
    </nav>
  );
};
