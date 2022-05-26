import React, {useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from "../../helpers/consts";
import {Navigation} from "../../helpers/navigation";
import {useHistory} from "react-router-dom";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const history = useHistory();

    const signup = async (e: React.MouseEvent | React.FormEvent) => {
        e.preventDefault();
        fetch("/login/signup", {
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
                history.push(Navigation.login);
            } else {
                setLoginError(true);
            }
        });
    };
    
    return (<div className={"signup"}>
        <div className={"login"}>
            <div className={'login__header'}>
                <div className="app__logo" />
                <Typography variant={'h3'}>The Archive</Typography>
            </div>
            <div className={'login__container'}>
                <Typography variant={'h4'}>Sign up</Typography>
                <div className={"login__form"}>
                    <form onSubmit={signup}>
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
                                variant={'outlined'}
                                type={'submit'}
                                color="primary"
                                disabled={username === "" || password === ""}
                            >
                                Create user
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
}