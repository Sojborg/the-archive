import React, { useState } from "react";
import { Button, TextField } from "react-md";
import { useHistory, useLocation } from "react-router-dom";
import { postRequest } from "../../helpers/apiService";
import { Navigation } from "../../helpers/navigation";
import "./Login.scss";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = async () => {
    const response = await postRequest("/login", { username: username });
    window.localStorage.setItem('access_token', response.accessToken);
    history.push(Navigation.home);
  };

  return (
    <div className={"login"}>
      <div className={"login__container"}>
        <h1>Login</h1>
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
            type={"text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={"login__control login__control__button"}>
          <Button themeType={'contained'}
            theme="primary"
            disabled={username === '' || password === ''}
            onClick={login}>Login</Button>
        </div>
      </div>
    </div>
  );
};
