import React, {useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from "../../helpers/consts";
import {Navigation} from "../../helpers/navigation";
import {Link, useHistory} from "react-router-dom";
import "./Signup.scss";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signupError, setSignupError] = useState(false);
    const history = useHistory();

    const signup = async (e: React.MouseEvent | React.FormEvent) => {
        e.preventDefault();
        fetch("/Signup/signup", {
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
                setSignupError(false);
                history.push(Navigation.login);
            } else {
                setSignupError(true);
            }
        });
    };
    
    return (<div className={"signup"}>
        <div className={"signup"}>
            <div className={'signup__header'}>
                <div className="app__logo" />
                <Typography variant={'h3'}>The Archive</Typography>
            </div>
            <div className={'signup__container'}>
                <Typography variant={'h4'}>Sign up</Typography>
                <div className={"signup__form"}>
                    <form onSubmit={signup}>
                        {signupError && (
                            <div className={"signup__error"}>Wrong username or password.</div>
                        )}
                        <div className={"signup__control"}>
                            <TextField
                                id="username"
                                variant={'outlined'}
                                label={"Username"}
                                type={"text"}
                                fullWidth={true}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className={"signup__control"}>
                            <TextField
                                id="password"
                                label={"password"}
                                variant={'outlined'}
                                fullWidth={true}
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={"signup__control signup__control__button"}>
                            <Button
                                variant={'contained'}
                                type={'submit'}
                                color="primary"
                                fullWidth={true}
                                disabled={username === "" || password === ""}
                            >
                                Sign up
                            </Button>
                            <Link to={Navigation.login}>Already have a user? Go to login!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
}