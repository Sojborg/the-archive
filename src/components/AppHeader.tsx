import React, { useContext } from "react";
import { Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { AppContext } from "../AppProvider";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../helpers/consts";
import { Navigation } from "../helpers/navigation";
import { SearchBar } from "./SearchBar";
import MenuIcon from '@mui/icons-material/Menu';
import { useIsFetching } from "@tanstack/react-query";

export const AppHeader = () => {
  const appContext = useContext(AppContext);
  const isFetching = useIsFetching();

  const logOut = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    window.location.assign("/login");
  };

  return (
    <>
      <nav className={"app__navigation"}>
        <MenuIcon className={'app__navigation__icon'} />
        <Link to={Navigation.home} className="app__logo" />
        <ul>
          <li>
            <Link to={Navigation.home}>Home</Link>
          </li>
          <li>
            <Link to={Navigation.books}>Books</Link>
          </li>
        </ul>
        <SearchBar />
        <Button className={"app__logout__button"} onClick={logOut}>
          Log out
        </Button>
      </nav>
      {(isFetching || appContext.isLoading) && (
        <div className={"loading-linear"}>
          <LinearProgress id="simple-linear-progress" />
        </div>
      )}
    </>
  );
};
