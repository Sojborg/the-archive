import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../helpers/navigation';
import { CreateBook } from './CreateBook';

export const Books = () => {
  const [books, setBooks] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const books = await fetch('/books').then(data => data.json());
      setBooks(books);
    }
    fetchData();
  }, [])

  return (
    <div className={'books'}>
      <h1>Books</h1>
      <button><Link to={Navigation.newbook}>New book</Link></button>
      {books && books.map(book => <li>{book.title}</li>)}
    </div>
  );
}
