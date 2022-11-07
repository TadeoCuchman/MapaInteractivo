import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Login.css'


export const Login = ({ setToken }) => {
  const [mail, changeMail] = useState("");
  const [password, changePassword] = useState("");
  let navigate = useNavigate();

  const newLogin = () => {
    fetch("http://localhost:3200/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        password: password,
      }),
    })
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (res) {
        if (res.error) {
          alert(res.error);
        } else {
          alert(res.data);
          localStorage.setItem("token", res.token);
          localStorage.setItem("alias", JSON.stringify(res.user.name));
          setToken(localStorage.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Network not working", err);
      });
  };
  return (
    <div id="loginContainer">
      <h1>Login</h1>

      <form
        method="POST"
        className="forms"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <p>Email:</p>
        <input
          className="logs"
          id="mail"
          type="email"
          name="mail"
          placeholder="Enter your Email"
          onChange={(e) => changeMail(e.target.value)}
        />
        <p>Password:</p>
        <input
          className="logs"
          id="password"
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={(e) => changePassword(e.target.value)}
        />
        <button className="logss" type="sumbit" id="login" onClick={newLogin}>
          Login!
        </button>
      </form>

      <Link to="/Register">
        <button className="logss">Pedí un registro</button>
      </Link>
    </div>
  );
};
