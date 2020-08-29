import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../../components/Book";
import { Navigation } from "../../helpers/navigation";
import { IBook } from "../../helpers/types";
import { useFetch } from "../../hooks/useFetch";
import './Books.scss';

export const Books = () => {
  const response = useFetch<IBook[]>("/books");
  const books = response.response;

  return (
    <div className={"books"}>
      <h1>Books</h1>
      <button>
        <Link to={Navigation.newbook}>New book</Link>
      </button>
      {response.isFetchingData && <h2>...</h2>}
      <ul className={'books__list'}>
        {books &&
          books.map((book: IBook) => (
            <Book key={book.id} book={book} />
          ))}
      </ul>
    </div>
  );
};
