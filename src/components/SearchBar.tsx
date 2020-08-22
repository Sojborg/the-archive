import React, { useState } from "react";
import { IBook } from "../helpers/types";
import { useFetch } from "../hooks/useFetch";
import { Book } from "./Book";

interface ISearchBarProps {
}

export const SearchBar = (props: ISearchBarProps) => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const response = useFetch<any>(`/searchbook?q=${query}`);

  const onSearchClick = () => {
    setQuery(inputValue);
  };

  return (
    <div className={"search-bar"}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={"text"}
      />
      <button onClick={onSearchClick}>Search</button>
      {!response.error && response.response && response.response.items && (
        <ul>
          {response.response.items.map((apiBook: any) => {
            const { volumeInfo } = apiBook;
            const book = {
              title: volumeInfo.title,
              synopsis: volumeInfo.description,
              publisher: volumeInfo.publisher,
              pageCount: volumeInfo.pageCount,
              coverImageUrl: volumeInfo.imageLinks.thumbnail,
            } as IBook;
            return <Book book={book} />;
          })}
        </ul>
      )}
    </div>
  );
};
