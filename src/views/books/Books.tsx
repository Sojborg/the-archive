import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../helpers/navigation';
import { Book } from '../../helpers/types';
import { useFetch } from '../../hooks/useFetch';

export const Books = () => {
  const response = useFetch<Book[]>('/books');
  const books = response.response;

  return (
    <div className={'books'}>
      <h1>Books</h1>
      <button><Link to={Navigation.newbook}>New book</Link></button>
      {response.isFetchingData && <h2>...</h2>}
      {books && books.map((book: Book) => <li>{book.title}</li>)}
    </div>
  );
}
