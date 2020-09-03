import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../../components/Book";
import { Navigation } from "../../helpers/navigation";
import { IBook } from "../../helpers/types";
import { useFetch } from "../../hooks/useFetch";
import './Books.scss';
import { Button, LinearProgress } from "react-md";

export const Books = () => {
  const response = useFetch<IBook[]>("/books");
  const books = response.response;

  return (
    <div className={"books"}>
      {response.isFetchingData && <LinearProgress id="simple-linear-progress" />}
      <h1>Books</h1>
      <div className={'books__actions'}>
        <Button themeType={"outline"} className={'books__new-book-button'}>
          <Link to={Navigation.newbook}>New book</Link>
        </Button>
      </div>
      <ul className={'books__list'}>
        {books &&
          books.map((book: IBook) => (
            <Book key={book.id} book={book} />
          ))}
      </ul>
    </div>
  );
};
