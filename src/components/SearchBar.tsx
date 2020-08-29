import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Navigation } from "../helpers/navigation";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const onSearchClick = () => {
    history.push(`${Navigation.search}/${inputValue}`);
  };

  return (
    <div className={"search-bar"}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={"text"}
      />
      <button onClick={onSearchClick}>Search</button>      
    </div>
  );
};
