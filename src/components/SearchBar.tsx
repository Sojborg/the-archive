import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Navigation } from "../helpers/navigation";
import { TextField, Button } from "@material-ui/core";
import "./SearchBar.scss";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const onSubmit = () => {
    history.push(`${Navigation.search}/${inputValue}`);
  };

  return (
    <div className={"search-bar"}>
      <form className={"search-bar__form"} onSubmit={onSubmit}>
        <TextField
          id="search-input"
          value={inputValue}
          label={"Search for book"}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant={'outlined'} onClick={onSubmit}>
          Search
        </Button>
      </form>
    </div>
  );
};
