import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Book } from "../../components/Book";
import { IBook } from "../../helpers/types";
import { useFetch } from "../../hooks/useFetch";

interface ISearchBarProps {
  query?: string;
}

export const Search = (props: ISearchBarProps) => {
  const [query, setQuery] = useState('');
  const response = useFetch<any>(`/searchbook?q=${query}`);

  useEffect(() => {
    console.log('query', props.query)
    if (props.query) {
      setQuery(props.query);
    }
  }, [props.query])

  return (
    <div className={"search"}>
      <h2>Search</h2>
      {!response.error && response.response && response.response.items && (
        <ul>
          {response.response.items.map((apiBook: any) => {
            const { volumeInfo } = apiBook;
            const book = {
              title: volumeInfo.title,
              synopsis: volumeInfo.description,
              publisher: volumeInfo.publisher,
              pageCount: volumeInfo.pageCount,
              coverImageUrl: volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail,
            } as IBook;
            return <Book book={book} />;
          })}
        </ul>
      )}
    </div>
  );
};
