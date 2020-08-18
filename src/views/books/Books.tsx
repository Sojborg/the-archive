import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../helpers/navigation";
import { Book } from "../../helpers/types";
import { useFetch } from "../../hooks/useFetch";
import './Books.scss';

export const Books = () => {
  const response = useFetch<Book[]>("/books");
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
          books.map((book: Book) => (
            <li key={book.id} className={"books__list__item"}>
              <img src={book.coverImageUrl} />
              <div className={'books__list__item__description'}>
                <h4>{book.title}</h4>
                <p>{book.synopsis}</p>
              </div>
              <div className={'books__list__item__info'}>
                <p>Publisher: {book.publisher}</p>
                <p>Page count: {book.pageCount}</p>
                <p>Product id: {book.productId}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
