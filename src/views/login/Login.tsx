import React, { useState } from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../helpers/consts";
import { Navigation } from "../../helpers/navigation";
import "./Login.scss";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

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
        navigate(Navigation.home);
      } else {
        setLoginError(true);
      }
    });
  };

  return (
    <div className={"login"}>
      <div className={'login__header'}>
        <div className="app__logo" />
        <Typography variant={'h3'}>The Archive</Typography>
      </div>
      <div className={'login__container'}>
      <Typography variant={'h4'}>Login</Typography>
      <div className={"login__form"}>
        <form onSubmit={login}>
          {loginError && (
            <div className={"login__error"}>Wrong username or password.</div>
          )}
          <div className={"login__control"}>
            <TextField
              id="username"
              label={"Username"}
              type={"text"}
              fullWidth={true}
              variant={'outlined'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={"login__control"}>
            <TextField
              id="password"
              label={"password"}
              type={"password"}
              variant={'outlined'}
              fullWidth={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={"login__control login__control__button"}>
            <Button
              variant={'contained'}
              type={'submit'}
              color="primary"
              fullWidth={true}
              disabled={username === "" || password === ""}
              onClick={login}
            >
              Login
            </Button>
            <Link to={Navigation.signup}>New user? Go sign up!</Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};
