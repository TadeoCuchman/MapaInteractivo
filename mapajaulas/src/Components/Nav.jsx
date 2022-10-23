import * as React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <img src="/mundo.jpeg" alt="" />
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/map"}>Mapa</Link>
        </li>
        <li>
          <Link to={"/workspaces"}>Agregar espacio de trabajo</Link>
        </li>
      </ul>
    </nav>
  );
};
