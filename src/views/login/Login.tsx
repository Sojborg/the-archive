import React, { useState } from "react";
import { Button, TextField } from "react-md";
import { useHistory } from "react-router-dom";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../helpers/consts";
import { Navigation } from "../../helpers/navigation";
import "./Login.scss";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const history = useHistory();

  const login = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        window.localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY,
          data.accessToken
        );
        setLoginError(false);
        history.push(Navigation.home);
      } else {
        setLoginError(true);
      }
    });
  };

  return (
    <div className={"login"}>
      <div className={"login__container"}>
        <h1>Login</h1>
        <form onSubmit={login}>
          {loginError && (
            <div className={"login__error"}>Wrong username or password.</div>
          )}
          <div className={"login__control"}>
            <TextField
              id="username"
              label={"Username"}
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={"login__control"}>
            <TextField
              id="password"
              label={"password"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={"login__control login__control__button"}>
            <Button
              themeType={"contained"}
              type={'submit'}
              theme="primary"
              disabled={username === "" || password === ""}
              onClick={login}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
